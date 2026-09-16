import CodeBlock from "@/components/CodeBlock";

const modes = [
  {
    number: "01",
    name: "Auto",
    title: "You have something worth showing and no opinion about where.",
    description:
      "inklet reads the assets, chooses the displays that can render them, and does the typesetting. Intent is a sentence of direction, not a template — it steers the layout without describing it. Add context: \"history\" and the agent may also read what you sent before.",
    code: `const result = await inklet.push.auto({
  idempotencyKey: "daily-brief-2026-09-15",
  title: "Daily brief",
  intent: "Make the key update easy to scan",
  context: "history", // optional: read earlier uploads too
  assets: [
    inklet.assets.text("Revenue is up 12% week over week."),
    inklet.assets.link("https://example.com/report"),
  ],
});`,
  },
  {
    number: "02",
    name: "Manual",
    title: "You know the room. inklet still sets the type.",
    description:
      "One display, named by id. The agent still summarises and lays out — text, links, images, PDFs — but the routing decision stays yours.",
    code: `await inklet.push.manual({
  displayId: "display_123",
  assets: [
    inklet.assets.image({
      data: await readFile("chart.png"),
      filename: "chart.png",
      contentType: "image/png",
    }),
    inklet.assets.text("This week's trend"),
  ],
});`,
  },
  {
    number: "03",
    name: "Hardcode",
    title: "You already made the picture.",
    description:
      "Exactly one PNG or JPEG, to exactly one display, rendered as sent. No AI runs and no AI allowance is spent. inklet scales it to the panel — your source does not have to arrive at 800×480.",
    code: `await inklet.push.hardcode({
  displayId: "display_123",
  image: inklet.assets.image({
    data: await readFile("poster.jpg"),
    filename: "poster.jpg",
    contentType: "image/jpeg",
  }),
});`,
  },
];

export default function SdkPush() {
  return (
    <section className="py-32 border-t border-[#2a2a2a]">
      <div className="max-w-6xl mx-auto px-6">
        <p className="eyebrow text-[#777] mb-3">
          Push
        </p>
        <h2 className="font-[family-name:var(--font-newsreader)] text-3xl md:text-4xl lg:text-5xl font-light mb-4 max-w-2xl">
          Three ways to put something on a wall.
        </h2>
        <p className="text-[#888] leading-relaxed max-w-xl mb-20">
          They differ in how much of the decision you keep. Each is one call
          over an upload and an analysis, hands back the Content and the
          Analysis it started, and can be replayed safely under one idempotency
          key. Auto and Manual run inklet&apos;s agent and need a Pro plan;
          Hardcode runs no AI and stays on Free.
        </p>

        <div className="space-y-20">
          {modes.map((mode) => (
            <div
              key={mode.number}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start"
            >
              <div>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-[family-name:var(--font-ibm-plex-mono)] text-sm text-[#555] tracking-wider">
                    {mode.number}
                  </span>
                  <span className="text-sm font-[family-name:var(--font-ibm-plex-mono)] text-[#999] uppercase">
                    {mode.name}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-newsreader)] text-2xl md:text-[26px] font-light leading-snug mb-4">
                  {mode.title}
                </h3>
                <p className="text-[#888] leading-relaxed text-[15px] max-w-md">
                  {mode.description}
                </p>
              </div>

              <CodeBlock code={mode.code} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
