const RELEASES_API = "https://api.github.com/repos/inklethq/app/releases?per_page=20";
export const RELEASES_PAGE_URL = "https://github.com/inklethq/app/releases";

export type MacRelease = {
  /** Channel label shown next to the version, e.g. "Stable", "Alpha". */
  label: string;
  /** Git tag of the release, e.g. "v0.1.1". Empty when unknown. */
  version: string;
  /** Direct download URL of the macOS .dmg (or the releases page as a fallback). */
  url: string;
};

export type MacReleases = {
  stable: MacRelease;
  /** Newest pre-release that is newer than the current stable, if any. */
  prerelease: MacRelease | null;
};

type GitHubAsset = { name: string; browser_download_url: string };
type GitHubRelease = {
  tag_name: string;
  draft: boolean;
  prerelease: boolean;
  published_at: string | null;
  assets: GitHubAsset[];
};

/** Used when the GitHub API is unreachable or rate-limited. Never 404s. */
const FALLBACK: MacReleases = {
  stable: { label: "Stable", version: "", url: RELEASES_PAGE_URL },
  prerelease: null,
};

function pickMacAsset(assets: GitHubAsset[]): GitHubAsset | undefined {
  const dmgs = assets.filter((a) => /\.dmg$/i.test(a.name));
  return (
    dmgs.find((a) => /macos\.dmg$/i.test(a.name)) ??
    dmgs.find((a) => /mac-universal\.dmg$/i.test(a.name)) ??
    dmgs.find((a) => /mac/i.test(a.name))
  );
}

function channelLabel(tag: string): string {
  const t = tag.toLowerCase();
  if (t.includes("alpha")) return "Alpha";
  if (t.includes("beta")) return "Beta";
  if (/(^|[-.])rc([-.]|\d|$)/.test(t)) return "RC";
  return "Pre-release";
}

function toMacRelease(release: GitHubRelease, label: string): MacRelease | null {
  const asset = pickMacAsset(release.assets);
  if (!asset) return null;
  return { label, version: release.tag_name, url: asset.browser_download_url };
}

function publishedAt(release: GitHubRelease): number {
  return release.published_at ? Date.parse(release.published_at) : 0;
}

/**
 * Resolves the macOS download channels from GitHub releases.
 * Cached for an hour via ISR; falls back to the releases page on any failure.
 */
export async function getMacReleases(): Promise<MacReleases> {
  try {
    const token = process.env.GITHUB_TOKEN;
    const res = await fetch(RELEASES_API, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return FALLBACK;

    const json: unknown = await res.json();
    if (!Array.isArray(json)) return FALLBACK;

    const releases = (json as GitHubRelease[])
      .filter((r) => !r.draft && Array.isArray(r.assets))
      .sort((a, b) => publishedAt(b) - publishedAt(a));

    let stable: MacRelease | null = null;
    let stableTime = 0;
    for (const r of releases) {
      if (r.prerelease) continue;
      stable = toMacRelease(r, "Stable");
      if (stable) {
        stableTime = publishedAt(r);
        break;
      }
    }
    if (!stable) return FALLBACK;

    let prerelease: MacRelease | null = null;
    for (const r of releases) {
      if (!r.prerelease || publishedAt(r) <= stableTime) continue;
      prerelease = toMacRelease(r, channelLabel(r.tag_name));
      if (prerelease) break;
    }

    return { stable, prerelease };
  } catch {
    return FALLBACK;
  }
}
