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

/**
 * Screenshots of inklet Portal for macOS 0.3, captured at 2x in light mode
 * with the window margins trimmed. `width` and `height` are the trimmed size.
 */
const items: Item[] = [
  {
    label: "Compose",
    title: "Say what should happen to it",
    description:
      "Write a note, paste a link, drop a picture or a PDF. The send button says what it will do: Just upload keeps it in Knowledge with no AI run, Push to device makes a card from it, and Recent summary makes one from it and your last seven days of notes. A lone picture can also be shown as-is, with no AI at all. ⌥1 to ⌥4 pick the action and ⌘↩ sends. Pick a display, or let inklet choose.",
    src: "/portal/mac-composer-send.png",
    alt: "The inklet Portal composer with its send menu open: Just upload, Push to device, Recent summary",
    width: 1456,
    height: 518,
    wide: true,
  },
  {
    label: "Shortcut",
    title: "From any app, in one keystroke",
    description:
      "Press ⇧⌘I anywhere and the composer opens with what you had in front of you already offered — the page in your browser, the text you selected in Obsidian, Notion, or Craft. Press Tab to take it, or keep typing. Right-click and choose Send to inklet from the Services menu to hand it a file instead.",
    src: "/portal/portal-composer-capture.png",
    alt: "The composer opened over a browser, offering the current page's title with a Tab key hint",
    width: 1132,
    height: 376,
    apps: true,
  },
  {
    label: "Home",
    title: "Your day, at a glance",
    description:
      "Home opens on what matters now: the weather outside if you want it, how much you have saved and how many days in a row, and every display with the picture it is showing. Create a Presentation is one click away, and the composer is one shortcut away from any other app.",
    src: "/portal/mac-home.png",
    alt: "The Home page of inklet Portal for Mac with the weather, an activity grid of saved items, and two displays",
    width: 2172,
    height: 1434,
  },
  {
    label: "Ask",
    title: "Ask what you saved",
    description:
      "Start a conversation and ask about anything in Knowledge. The answer is written as you watch, the notes it drew on and anything it did collect under Materials & results, and it only makes a card or puts an earlier picture back on a display when you ask. Conversations keep their own titles, and you can rename them. Ask is part of Pro.",
    src: "/portal/mac-ask.png",
    alt: "A conversation in Ask inklet, with Materials & results above the thread and a message box below",
    width: 2172,
    height: 1434,
  },
  {
    label: "History",
    title: "Every run, replayed",
    description:
      "History lists every run inklet has made for you — the ones you asked for and the daily summary — and replays each one: what the agent was given, which notes it read, which layout it chose, when a plan went back for another try, and when the panel showed the picture.",
    src: "/portal/mac-history.png",
    alt: "A run in History with its timeline: analysis created, queued, picked up, material gathered, notes read, layout chosen, a retried plan",
    width: 2172,
    height: 1434,
  },
  {
    label: "Displays",
    title: "Know what is on every panel",
    description:
      "Each display has one page: what is on the screen now, what is up next, and everything it has shown before. Show next moves through the queue, any earlier card can go back up, and any picture opens the run that made it. Battery, firmware, and last seen for a panel, with the serial and Dot. cloud reachability for a Quote/0; canvas, resolution, and revision for a virtual one.",
    src: "/portal/mac-display-quote0.png",
    alt: "The page for a Dot. Quote/0 in inklet Portal: the picture on screen, up next, device details, and queue and history",
    width: 2172,
    height: 1434,
  },
  {
    label: "Virtual Display",
    title: "A panel that lives on your desktop",
    description:
      "Not every idea needs hardware. A Virtual Display is a canvas for a widget on your Mac desktop — pick a size, and inklet renders to it the same way it renders to paper. The same page connects a Dot. Quote/0 you already own with its API key, and is where an inklet D1 will pair.",
    src: "/portal/mac-new-display.png",
    alt: "The New Display screen in inklet Portal, offering an inklet D1, a Virtual Display, or a Dot. Quote/0",
    width: 2172,
    height: 1434,
  },
  {
    label: "Knowledge",
    title: "Everything you send is kept",
    description:
      "Notes, links, pictures, and PDFs land in Knowledge the moment you send them, sorted into pending and organized as the agent works through them. Search covers the whole library, down to what inklet read out of an image or a PDF, and any item opens in place. When you want it on a wall, Recent summary makes a card from a new note and your last seven days; in the browser you can summarise the last day, week, or month.",
    src: "/portal/mac-knowledge.png",
    alt: "The Knowledge page in inklet Portal listing saved notes and links, with a search box",
    width: 2172,
    height: 1434,
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
                sizes="(min-width: 1152px) 828px, calc(100vw - 48px)"
                className="w-full lg:w-3/4 h-auto mt-12 lg:-mt-28"
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
