import Image from "next/image";
import Link from "next/link";

const LINK_CLASS =
  "inline-flex items-center gap-1.5 mt-3 text-[13px] text-[#c9c6be] hover:text-[#f5f3ed] transition-colors";

/** The three display types New Display offers in inklet Portal for Mac 0.3. */
const kinds = [
  {
    name: "inklet D1",
    spec: "7.5-inch e-ink · 800×480",
    body: "Our own panel, made for the room it lives in, with months between charges. You claim it by tapping the NFC tag on its back with the inklet iPhone app. D1 is coming to Kickstarter.",
    link: { label: "About D1", href: "/display" },
  },
  {
    name: "Virtual Display",
    spec: "Large or Extra Large widget on Mac",
    body: "A canvas that lives on your desktop instead of a wall. Pick a size, add the widget, and inklet renders to it the same way it renders to paper. No hardware needed.",
  },
  {
    name: "Dot. Quote/0",
    spec: "296×152 · through Dot. cloud",
    body: "Already have a Quote/0? Connect it with a Dot. API key and its serial number, and inklet sends every card through Dot.'s cloud. The key is stored encrypted on our server, and you can revoke it in the Dot. app at any time.",
    link: { label: "About Quote/0", href: "https://dot.mindreset.tech/product/quote" },
  },
];

export default function PortalDisplays() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <p className="eyebrow text-[#777] mb-3">Displays</p>
        <h2 className="font-[family-name:var(--font-newsreader)] text-3xl md:text-4xl font-light mb-4">
          Three kinds of display.
        </h2>
        <p className="text-[#888] leading-relaxed max-w-xl mb-14">
          Add any of them from New Display in the Mac app, then send to it from
          the composer like any other display.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-12 lg:gap-14 items-center">
          <Image
            src="/portal/mac-new-display.png"
            alt="The New Display screen in inklet Portal, offering an inklet D1, a Virtual Display, or a Dot. Quote/0"
            width={2172}
            height={1434}
            sizes="(min-width: 1152px) 620px, (min-width: 1024px) 56vw, calc(100vw - 48px)"
            className="w-full h-auto"
          />

          <ul className="border-t border-[#2a2a2a]">
            {kinds.map((kind) => (
              <li key={kind.name} className="py-6 border-b border-[#2a2a2a]">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-2">
                  <h3 className="font-[family-name:var(--font-newsreader)] text-xl">
                    {kind.name}
                  </h3>
                  <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] text-[#666]">
                    {kind.spec}
                  </span>
                </div>
                <p className="text-[#888] leading-relaxed text-[14.5px]">
                  {kind.body}
                </p>
                {kind.link &&
                  (kind.link.href.startsWith("/") ? (
                    <Link href={kind.link.href} className={LINK_CLASS}>
                      {kind.link.label}
                      <span aria-hidden="true">→</span>
                    </Link>
                  ) : (
                    <a
                      href={kind.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={LINK_CLASS}
                    >
                      {kind.link.label}
                      <span aria-hidden="true">↗</span>
                    </a>
                  ))}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
