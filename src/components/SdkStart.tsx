import { CHANGELOG_URL, DOCS_URL, GITHUB_URL, NPM_URL, PACKAGE_NAME } from "@/data/sdk";

const steps = [
  {
    number: "01",
    title: "Create a token",
    body: "Personal access tokens are issued under API tokens in the Portal, with a name and an optional expiry. Each is shown once — copy it into your environment, never into source.",
  },
  {
    number: "02",
    title: "Install the package",
    body: `npm install ${PACKAGE_NAME} — Node 20 or newer, ESM or CommonJS, types included.`,
  },
  {
    number: "03",
    title: "Push something",
    body: "One call puts words on a wall. Then watch the run, read a panel's history, or skip the agent and switch the image yourself.",
  },
];

const links = [
  { label: "GitHub", href: GITHUB_URL },
  { label: "npm", href: NPM_URL },
  { label: "Changelog", href: CHANGELOG_URL },
];

export default function SdkStart() {
  return (
    <section className="py-32 border-t border-[#2a2a2a]">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-[family-name:var(--font-newsreader)] text-3xl md:text-4xl font-light text-center mb-4">
          Start with a token.
        </h2>
        <p className="text-[15px] text-[#888] text-center mb-16 max-w-lg mx-auto leading-relaxed">
          The SDK is at 0.2 and still in developer preview. The surface is
          small on purpose and stable enough to build on; breaking changes are
          listed in the changelog with what to change.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-16">
          {steps.map((step) => (
            <div key={step.number}>
              <span className="font-[family-name:var(--font-ibm-plex-mono)] text-sm text-[#555] tracking-wider">
                {step.number}
              </span>
              <h3 className="font-[family-name:var(--font-newsreader)] text-xl mt-2.5 mb-3">
                {step.title}
              </h3>
              <p className="text-[14px] text-[#888] leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-7 py-3 bg-[#f5f3ed] text-[#1a1a1a] rounded-full text-sm font-medium hover:bg-[#e8e5db] transition-colors"
          >
            Read the docs
          </a>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-7 py-3 border border-[#333] text-[#888] rounded-full text-sm font-medium hover:border-[#555] hover:text-[#f5f3ed] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
