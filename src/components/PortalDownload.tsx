"use client";

import { useSyncExternalStore } from "react";
import { SiApple } from "react-icons/si";
import { TbBrandWindows, TbWorld } from "react-icons/tb";
import type { IconType } from "react-icons";
import type { MacReleases } from "@/lib/releases";

type PlatformId = "macos" | "ios" | "windows" | "web";

const MAC_REQUIREMENTS = "Universal · macOS 26+";

const platforms: {
  id: PlatformId;
  label: string;
  Icon: IconType;
  href: string;
  soon?: boolean;
}[] = [
  {
    id: "macos",
    label: "macOS",
    Icon: SiApple,
    href: "", // resolved from GitHub releases at render time
  },
  {
    id: "windows",
    label: "Windows",
    Icon: TbBrandWindows,
    href: "#",
    soon: true,
  },
  {
    id: "web",
    label: "Web",
    Icon: TbWorld,
    href: "https://portal.iminklet.com",
  },
  {
    id: "ios",
    label: "iOS",
    Icon: SiApple,
    href: "#",
    soon: true,
  },
];

function detectPlatform(): PlatformId {
  if (typeof navigator === "undefined") return "macos";
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua)) return "ios";
  if (/Mac/.test(ua)) return "macos";
  if (/Win/.test(ua)) return "windows";
  return "web";
}

function subscribeToPlatform() {
  return () => {};
}

export default function PortalDownload({ mac }: { mac: MacReleases }) {
  const detected = useSyncExternalStore<PlatformId>(
    subscribeToPlatform,
    detectPlatform,
    () => "macos",
  );
  // Platforms marked "soon" have nothing to download yet; highlight Web instead.
  const primary: PlatformId = platforms.some((p) => p.id === detected && !p.soon)
    ? detected
    : "web";

  return (
    <section id="download" className="py-32">
      <div className="max-w-4xl mx-auto px-6">
        <p className="font-[family-name:var(--font-newsreader)] text-2xl md:text-3xl font-light text-center mb-4">
          Ready to orchestrate your ambient life?
        </p>
        <p className="text-sm text-[#888] text-center mb-14 max-w-lg mx-auto leading-relaxed">
          The native macOS app opens from any app with a shortcut or the Services menu, follows each run from the menu bar, and puts your displays on the desktop as widgets. The web dashboard works everywhere. iOS adds display pairing.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {platforms.map((p) => {
            const isPrimary = p.id === primary;
            const href = p.id === "macos" ? mac.stable.url : p.href;
            const external = p.id === "web" ? { target: "_blank", rel: "noopener noreferrer" } : {};
            return (
              <div key={p.id} className="text-center">
                {p.soon ? (
                  <span className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 bg-[#333] text-[#888] rounded-full text-sm font-medium cursor-default">
                    <p.Icon size={16} />
                    {p.label}
                    <sup className="text-[9px] text-[#555]">soon</sup>
                  </span>
                ) : isPrimary ? (
                  <a
                    href={href}
                    {...external}
                    className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 bg-[#f5f3ed] text-[#1a1a1a] rounded-full text-sm font-medium hover:bg-[#e8e5db] transition-colors"
                  >
                    <p.Icon size={16} />
                    {p.label}
                  </a>
                ) : (
                  <a
                    href={href}
                    {...external}
                    className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 border border-[#333] text-[#888] rounded-full text-sm font-medium hover:border-[#555] hover:text-[#f5f3ed] transition-colors"
                  >
                    <p.Icon size={16} />
                    {p.label}
                  </a>
                )}
                {p.id === "macos" && (
                  <div className="text-[10px] font-[family-name:var(--font-ibm-plex-mono)] mt-2.5 space-y-1">
                    <p className="text-[#888]">{MAC_REQUIREMENTS}</p>
                    {mac.stable.version && (
                      <p className="text-[#888]">
                        {mac.stable.label} {mac.stable.version}
                      </p>
                    )}
                    {mac.prerelease && (
                      <p>
                        <a
                          href={mac.prerelease.url}
                          className="text-[#666] underline underline-offset-4 decoration-[#444] hover:text-[#f5f3ed] hover:decoration-[#888] transition-colors"
                        >
                          {mac.prerelease.label} {mac.prerelease.version}
                        </a>
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
