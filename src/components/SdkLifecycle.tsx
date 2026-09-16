import CodeBlock from "@/components/CodeBlock";

const PIPELINE = `// 1. Store Content. No AI runs, nothing is spent.
const { content } = await inklet.contents.upload({
  title: "Dentist",
  assets: [inklet.assets.text("Dentist at 9am tomorrow")],
});

// 2. Analyze it. inklet picks compatible Displays.
const analysis = await inklet.analyze({
  contentIds: [content.id],
  intent: "Make a reminder card",
});

// 3. Wait for the run. A history-only run can queue
//    for a while, so raise timeoutMs for those.
const done = await inklet.analyses.wait(analysis);

if (done.outcome === "presentations") {
  console.log(done.presentationIds);
} else {
  console.log("no change:", done.noChangeReason);
}`;

const states = [
  {
    label: "Content",
    values: ["pending", "ready"],
    note: "What you handed in.",
  },
  {
    label: "Analysis",
    values: ["queued", "running", "completed"],
    note: "One run of the agent.",
  },
  {
    label: "Presentation",
    values: ["preparing", "queued", "published", "confirmed", "expired"],
    note: "What a specific panel will show.",
  },
];

/** The knobs on analyze(); everything else is the agent's call. */
const options = [
  ["contentIds", "Contents to analyze. Omit to summarise recent history instead."],
  ["context", "submitted, the default, or history: the agent may also read your earlier uploads."],
  ["scope", "{ since: \"72h\" } — how far back history reaches. The plan clamps it; sinceAt says where it landed."],
  ["target", "Omit to let the agent choose, name displayIds to pin, or { output } for a software-only Scene."],
  ["intent · title", "A sentence of direction for the agent. title overrides the generated one."],
];

export default function SdkLifecycle() {
  return (
    <section className="py-32 border-t border-[#2a2a2a]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <p className="eyebrow text-[#777] mb-3">
              Pipeline
            </p>
            <h2 className="font-[family-name:var(--font-newsreader)] text-3xl md:text-4xl font-light mb-5 leading-snug">
              A Content is what you sent. An Analysis is what inklet did with it.
            </h2>
            <p className="text-[#888] leading-relaxed max-w-md mb-10">
              Uploading and analyzing are separate steps. A Content is just the
              stored assets: no AI runs and nothing is spent until an Analysis
              references it. The Analysis produces Presentations, and a display
              shows one once it wakes and confirms it. Waiting returns when the
              run is over, or throws with the backend&apos;s code when it failed.
            </p>

            <div className="space-y-8">
              {states.map((row) => (
                <div key={row.label}>
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-sm font-[family-name:var(--font-ibm-plex-mono)] text-[#999] uppercase">
                      {row.label}
                    </span>
                    <span className="text-[13px] text-[#555]">{row.note}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
                    {row.values.map((value, index) => (
                      <span key={value} className="flex items-center gap-2">
                        {index > 0 && (
                          <span className="text-[#3a3a3a] text-xs">→</span>
                        )}
                        <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11.5px] text-[#c9c6be] border border-[#2a2a2a] rounded px-2.5 py-1">
                          {value}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              <div>
                <p className="text-sm font-[family-name:var(--font-ibm-plex-mono)] text-[#999] uppercase mb-3">
                  analyze() options
                </p>
                <ul className="border-t border-[#2a2a2a]">
                  {options.map(([name, note]) => (
                    <li
                      key={name}
                      className="grid grid-cols-[110px_1fr] gap-x-4 py-2.5 border-b border-[#2a2a2a]"
                    >
                      <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[12px] text-[#c9c6be]">
                        {name}
                      </span>
                      <span className="text-[12.5px] text-[#666] leading-relaxed">
                        {note}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <CodeBlock code={PIPELINE} filename="analyze.ts" />
        </div>
      </div>
    </section>
  );
}
