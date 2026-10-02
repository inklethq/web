import Image from "next/image";
import PortalTour, { type TourStop } from "@/components/PortalTour";

/**
 * Screenshots of inklet Portal for macOS 0.3, captured at 2x in light mode
 * with the window margins trimmed.
 */
const SCREEN = { width: 2172, height: 1434 };

const stops: TourStop[] = [
  {
    id: "ask",
    label: "Ask",
    caption:
      "Ask about anything you saved. The answer arrives as it is written, with the notes it drew on, and inklet only makes a card when you ask. Part of Pro.",
    src: "/portal/mac-ask.png",
    alt: "A conversation in Ask inklet, with Materials & results above the thread and a message box below",
  },
  {
    id: "knowledge",
    label: "Knowledge",
    caption:
      "Every note, link, picture, and PDF you send, sorted as the agent works through it. Search reaches the whole library, and any item opens in place.",
    src: "/portal/mac-knowledge.png",
    alt: "The Knowledge page in inklet Portal listing saved notes and links, with a search box",
  },
  {
    id: "history",
    label: "History",
    caption:
      "Every run, replayed: what the agent read, which layout it chose, and when the panel showed the picture.",
    src: "/portal/mac-history.png",
    alt: "A run in History with its timeline: analysis created, queued, picked up, material gathered, notes read, layout chosen, a retried plan",
  },
  {
    id: "displays",
    label: "Displays",
    caption:
      "One page per display: what is on it now, what is next, everything it has shown before, and the run behind each picture.",
    src: "/portal/mac-display-quote0.png",
    alt: "The page for a Dot. Quote/0 in inklet Portal: the picture on screen, up next, device details, and queue and history",
  },
];

export default function PortalShowcase() {
  return (
    <>
      {/*
        Staggered: the copy sits top-right, and the composer is pulled up
        underneath it so the window rises on the left while its menu lands
        below the text. The image's top-right is transparent, which is what
        makes the overlap safe.
      */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="lg:grid lg:grid-cols-[3fr_2fr] lg:gap-16">
            <div className="hidden lg:block" aria-hidden="true" />
            <div className="max-w-2xl lg:max-w-none">
              <p className="eyebrow text-[#777] mb-3">Compose</p>
              <h3 className="font-[family-name:var(--font-newsreader)] text-2xl md:text-3xl font-light mb-4">
                Say what should happen to it
              </h3>
              <p className="text-[#888] leading-relaxed">
                Write a note, paste a link, or drop a picture or a PDF, then
                pick what happens: Just upload keeps it in Knowledge, Push to
                device makes a card, and Recent summary folds in your last
                seven days. Press ⇧⌘I in any app and the composer opens with
                your page or selection already offered.
              </p>
            </div>
          </div>
          <Image
            src="/portal/mac-composer-send.png"
            alt="The inklet Portal composer with its send menu open: Just upload, Push to device, Recent summary"
            width={1456}
            height={518}
            sizes="(min-width: 1152px) 828px, calc(100vw - 48px)"
            className="w-full lg:w-3/4 h-auto mt-12 lg:-mt-28"
          />
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="eyebrow text-[#777] mb-3 text-center">Inside the app</p>
          <h2 className="font-[family-name:var(--font-newsreader)] text-3xl md:text-4xl font-light text-center mb-10">
            One window for all of it.
          </h2>
          <PortalTour stops={stops} width={SCREEN.width} height={SCREEN.height} />
        </div>
      </section>
    </>
  );
}
