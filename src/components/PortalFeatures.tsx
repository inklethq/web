import { TbBooks, TbLayoutCards, TbMessageCircleQuestion, TbSend } from "react-icons/tb";
import type { IconType } from "react-icons";

const features: { Icon: IconType; title: string; body: string }[] = [
  {
    Icon: TbSend,
    title: "Send from anywhere",
    body: "The browser, the Mac app, or ⇧⌘I in any other app on your Mac.",
  },
  {
    Icon: TbLayoutCards,
    title: "The right card, the right panel",
    body: "inklet lays it out and picks the display — or you name one.",
  },
  {
    Icon: TbBooks,
    title: "Nothing gets lost",
    body: "Knowledge keeps every note, link, picture, and PDF, and searches all of it.",
  },
  {
    Icon: TbMessageCircleQuestion,
    title: "Ask what you saved",
    body: "A conversation with your Knowledge, in the browser and on the Mac. Part of Pro.",
  },
];

export default function PortalFeatures() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl font-light text-center mb-16">
          Your displays, orchestrated.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
          {features.map(({ Icon, title, body }) => (
            <div key={title}>
              <Icon size={22} strokeWidth={1.5} className="text-[#777] mb-4" aria-hidden="true" />
              <h3 className="font-[family-name:var(--font-newsreader)] text-xl mb-2">
                {title}
              </h3>
              <p className="text-[#888] leading-relaxed text-[14.5px]">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
