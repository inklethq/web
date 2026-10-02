import Image from "next/image";
import { SiObsidian, SiNotion } from "react-icons/si";
import { TbBrandCraft } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";

type Item = {
  label: string;
  title: string;
  description: string;
  src: string;
  alt: string;
  /** The file's pixel size, so the slot keeps its shape before the image lands. */
  width: number;
  height: number;
  /** Full-width image with the text above it, for a screenshot that is wide. */
  wide?: boolean;
  /** Show the row of apps the selection capture reaches into. */
  apps?: boolean;
};

/** Screenshots of inklet Portal for macOS, captured at 2x with the window margins trimmed. */
const items: Item[] = [
  {
    label: "Compose",
    title: "Say what should happen to it",
    description:
      "Write a note, paste a link, drop a picture or a PDF. The send button says what it will do — keep it in Knowledge with no AI run, make a card from it, or make a card from it and your last seven days of notes — and a lone picture can go up as-is, with no AI at all. ⌥1 to ⌥4 pick the action and ⌘↩ sends. Pick a display, or let inklet choose.",
    src: "/portal/portal-composer-menu.png",
    alt: "The inklet Portal composer with its send menu open",
    width: 2012,
    height: 518,
    wide: true,
  },
  {
    label: "Shortcut",
    title: "From any app, in one keystroke",
    description:
      "Press ⌘⇧I anywhere and the composer opens with what you had in front of you already offered — the page in your browser, the text you selected in Obsidian, Notion, or Craft. Press Tab to take it, or keep typing. Right-click and choose Send to inklet from the Services menu to hand it a file instead.",
    src: "/portal/portal-composer-capture.png",
    alt: "The composer opened over a browser, offering the current page's title with a Tab key hint",
    width: 1132,
    height: 376,
    apps: true,
  },
  {
    label: "Displays",
    title: "Know what is on every panel",
    description:
      "Each display has one page: what is on the screen now, what is up next, and everything it has shown before. Show next moves through the queue, any earlier card can go back up, and any picture opens the run that made it. Battery and last seen for an inklet panel; canvas, resolution, and revision for a virtual one; serial and cloud reachability for a Quote/0.",
    src: "/portal/portal-virtual-display.png",
    alt: "A display page in inklet Portal with the current frame, up next, device details, and queue and history",
    width: 2172,
    height: 1452,
  },
  {
    label: "Virtual Display",
    title: "A panel that lives on your desktop",
    description:
      "Not every idea needs hardware. A Virtual Display is a canvas for a widget on your Mac desktop — pick a size, and inklet renders to it the same way it renders to paper. The same page connects a Dot. Quote/0 you already own with its API key, and is where an inklet D1 will pair.",
    src: "/portal/portal-new-display.png",
    alt: "The New Display screen in inklet Portal, offering a Hardware Display or a Virtual Display",
    width: 2172,
    height: 1452,
  },
  {
    label: "Knowledge",
    title: "Everything you send is kept",
    description:
      "Notes, links, pictures, and PDFs land in Knowledge the moment you send them, sorted into pending and organized as the agent works through them. Search covers the whole library, down to what inklet read out of an image or a PDF, and any item opens in place. When you want it on a wall, Recent summary makes a card from a new note and your last seven days; in the browser you can summarise the last day, week, or month.",
    src: "/portal/portal-knowledge.png",
    alt: "The Knowledge page in inklet Portal listing saved items under Organized and Pending",
    width: 2172,
    height: 1452,
  },
];

const apps = [
  { Icon: SiObsidian, name: "Obsidian" },
  { Icon: SiNotion, name: "Notion" },
  { Icon: TbBrandCraft, name: "Craft" },
  { Icon: VscVscode, name: "VS Code" },
];

function Copy({ item }: { item: Item }) {
  return (
    <>
      <p className="eyebrow text-[#777] mb-3">
        {item.label}
      </p>
      <h3 className="font-[family-name:var(--font-newsreader)] text-2xl md:text-3xl font-light mb-4">
        {item.title}
      </h3>
      <p className="text-[#888] leading-relaxed">
        {item.description}
      </p>
      {item.apps && (
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-6">
          {apps.map(({ Icon, name }) => (
            <div key={name} className="flex items-center gap-2">
              <Icon size={16} className="text-[#555]" />
              <span className="text-xs text-[#555] font-[family-name:var(--font-ibm-plex-mono)]">
                {name}
              </span>
            </div>
          ))}
          <span className="text-xs text-[#444]">
            & anywhere Copy works
          </span>
        </div>
      )}
    </>
  );
}

export default function PortalShowcase() {
  return (
    <section className="py-32">
      <div className="max-w-6xl mx-auto px-6 space-y-40">
        {items.map((item, i) =>
          item.wide ? (
            // Staggered: the copy sits top-right, and the image is pulled up
            // underneath it so the composer window rises on the left while
            // its menu stays below the text. The image's top-right is
            // transparent, which is what makes the overlap safe.
            <div key={item.label}>
              <div className="lg:grid lg:grid-cols-[3fr_2fr] lg:gap-16">
                <div className="hidden lg:block" aria-hidden="true" />
                <div className="max-w-2xl lg:max-w-none">
                  <Copy item={item} />
                </div>
              </div>
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(min-width: 1152px) 1104px, calc(100vw - 48px)"
                className="w-full h-auto mt-12 lg:-mt-28"
              />
            </div>
          ) : (
            <div
              key={item.label}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                i % 2 === 1 ? "lg:[direction:rtl]" : ""
              }`}
            >
              <div className="lg:[direction:ltr]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(min-width: 1024px) 552px, calc(100vw - 48px)"
                  className="w-full h-auto"
                />
              </div>
              <div className="lg:[direction:ltr]">
                <Copy item={item} />
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
