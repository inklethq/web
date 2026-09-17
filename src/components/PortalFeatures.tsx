
const features = [
  {
    number: "01",
    title: "One dashboard, every display",
    description:
      "See what is on every panel, what has been sent and is waiting for it to wake, and everything it has shown before. Move to the next card, put an earlier one back, or send straight to one display — from the browser, the Mac app, or your phone.",
  },
  {
    number: "02",
    title: "A second brain that keeps everything",
    description:
      "Every note, link, picture, and PDF you send is kept in Knowledge — searchable, and sorted into pending and organized. Ask for a summary of the last day, week, or month whenever you want one on a wall.",
  },
  {
    number: "03",
    title: "AI that shows its work",
    description:
      "Let inklet choose the panel, or name one yourself. The agent reads your notes, checks the display, picks a layout, and every run has a live timeline you can open. Uploading, and showing a picture as-is, never spend an AI run.",
  },
];

export default function PortalFeatures() {
  return (
    <section className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl font-light text-center mb-20">
          Your displays, orchestrated.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
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
