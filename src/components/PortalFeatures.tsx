
const features = [
  {
    number: "01",
    title: "One dashboard, every display",
    description:
      "See what is on every panel, what has been sent and is waiting for it to wake, and everything it has shown before. Move to the next card, put an earlier one back, or send straight to one display. The Mac app also sets up Virtual Displays for your desktop and connects a Dot. Quote/0 through its own cloud.",
  },
  {
    number: "02",
    title: "A second brain that keeps everything",
    description:
      "Every note, link, picture, and PDF you send is kept in Knowledge, sorted into pending and organized as the agent works through it. Search reaches the whole library — note text, link addresses, filenames, and what inklet read out of your images and PDFs — and on the Mac any item opens in place.",
  },
  {
    number: "03",
    title: "AI that shows its work",
    description:
      "Let inklet choose the panel, or name one yourself. The agent reads your notes, checks the display, and picks a layout, and every run keeps a live timeline — under Analyses in the browser and History on the Mac, where a picture on a display also opens the run that made it. Uploading, and showing a picture as-is, never spend an AI run.",
  },
  {
    number: "04",
    title: "Ask it anything you saved",
    description:
      "Ask inklet is a conversation with your Knowledge — Ask in the browser, ⇧⌘A on the Mac. The agent searches and reads your notes, answers with the ones it drew on, and only when you ask makes a card or puts an earlier picture back on a display. On the Mac, every answer links to the run behind it. Ask is part of Pro.",
  },
];

export default function PortalFeatures() {
  return (
    <section className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl font-light text-center mb-20">
          Your displays, orchestrated.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14">
          {features.map((feature) => (
            <div
              key={feature.number}
            >
              <span className="font-[family-name:var(--font-ibm-plex-mono)] text-sm text-[#555] tracking-wider">
                {feature.number}
              </span>
              <h3 className="font-[family-name:var(--font-newsreader)] text-2xl mt-3 mb-4">
                {feature.title}
              </h3>
              <p className="text-[#888] leading-relaxed text-[15px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
