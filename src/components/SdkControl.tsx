import CodeBlock from "@/components/CodeBlock";

const SWITCH = `// Everything this panel has shown before, newest first.
const shown = await inklet.presentations.list({
  displayId,
  state: "expired",
});

// Put an earlier card back. It confirms on its next sync.
const previous = shown.items[0].id;
await inklet.displays.setCurrent(displayId, previous);
await inklet.displays.waitUntilCurrent(displayId, previous);

// Or just move on to whatever is queued next.
const { changed } = await inklet.displays.advance(displayId);`;

const GENERATE = `const generation = await inklet.presentations.generate({
  intent: "Create a calm, glanceable summary",
  assets: [
    inklet.assets.text("Revenue increased 12% this week."),
  ],
  output: {
    preset: "macos-widget-medium",
    formats: ["scene", "png"],
  },
});

const presentation =
  await inklet.presentations.waitUntilReady(generation);
console.log(presentation.scene?.data);
console.log(presentation.renditions[0]?.url);

// Another size from the same Scene. No second AI run.
await inklet.presentations.render(presentation.id, {
  viewport: { width: 720, height: 340 },
});`;

const columns = [
  {
    title: "Switch the image on a display",
    body:
      "Pick what is on the panel by hand. Any Presentation that has already been delivered there and rendered can go back up — including one that has expired — or you can simply move to the next queued one. Both land as pending until the panel confirms, and a panel's full history is one list call away.",
    code: SWITCH,
    filename: "switch.ts",
  },
  {
    title: "Generate a Presentation without a display",
    body:
      "For software-only surfaces — a widget, a screensaver, a test. Generating is an upload plus an analysis with an output target: it registers nothing, queues nothing, and produces versioned Scene JSON with PNG renditions. A stored Scene renders again at another size without a second AI run.",
    code: GENERATE,
    filename: "generate.ts",
  },
];

export default function SdkControl() {
  return (
    <section className="py-32 border-t border-[#2a2a2a]">
      <div className="max-w-6xl mx-auto px-6">
        <p className="eyebrow text-[#777] mb-3">
          Control
        </p>
        <h2 className="font-[family-name:var(--font-newsreader)] text-3xl md:text-4xl lg:text-5xl font-light mb-4 max-w-2xl">
          Two things a push cannot do.
        </h2>
        <p className="text-[#888] leading-relaxed max-w-xl mb-16">
          Neither of these runs the agent over your Contents again, and neither
          spends an AI allowance.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-start">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="font-[family-name:var(--font-newsreader)] text-2xl md:text-[26px] font-light leading-snug mb-4">
                {column.title}
              </h3>
              <p className="text-[#888] leading-relaxed text-[15px] max-w-md mb-8">
                {column.body}
              </p>
              <CodeBlock code={column.code} filename={column.filename} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
