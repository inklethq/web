import CodeBlock from "@/components/CodeBlock";

const WATCH = `import { describeEvent, isAnalysisEvent } from "@inklethq/sdk";

for await (const ev of inklet.analyses.watch(analysis.id)) {
  console.log(describeEvent(ev));
  // Reading your notes · 3 read
  // Looked at 2 layouts · chose Daily Summary
  // Submitted the plan · 2 actions

  if (isAnalysisEvent(ev, "plan.accepted")) {
    console.log(ev.data.presentationIds);
  }
}

// Rendering and delivery are written after the run
// ends, so watch() never sees them. timeline() does.
for await (const ev of inklet.analyses.timeline(analysis.id)) {
  if (ev.level !== "info") console.warn(ev.summary);
}`;

/** The public stream, stage by stage. Sixteen types and nothing else. */
const stages = [
  {
    stage: "Accepted",
    types: ["analysis.created", "analysis.dispatched", "analysis.leased", "analysis.lease_expired"],
  },
  {
    stage: "Working",
    types: ["context.materialized", "agent.activity"],
  },
  {
    stage: "Planning",
    types: ["plan.submitted", "plan.rejected", "plan.accepted"],
  },
  {
    stage: "Result",
    types: ["render.finished", "render.failed", "delivery.published", "delivery.confirmed", "delivery.failed"],
  },
  {
    stage: "Finished",
    types: ["analysis.completed", "analysis.failed"],
  },
];

export default function SdkEvents() {
  return (
    <section className="py-32 border-t border-[#2a2a2a]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <p className="eyebrow text-[#777] mb-3">
              Events
            </p>
            <h2 className="font-[family-name:var(--font-newsreader)] text-3xl md:text-4xl font-light mb-5 leading-snug">
              Watch the agent work, as it works.
            </h2>
            <p className="text-[#888] leading-relaxed max-w-md mb-10">
              An Analysis publishes an ordered event stream: what the agent was
              given, what it is reading, what it planned, and how the result was
              rendered and delivered. It streams over server-sent events,
              resumes from the last event if the connection drops, falls back
              to polling behind a proxy that cannot stream, and ends on its own
              when the run does. Every event becomes one English line — the
              same line the Portal shows.
            </p>

            <ul className="border-t border-[#2a2a2a] mb-8">
              {stages.map((row) => (
                <li
                  key={row.stage}
                  className="grid grid-cols-[84px_1fr] gap-x-4 py-3 border-b border-[#2a2a2a]"
                >
                  <span className="text-[12px] font-[family-name:var(--font-ibm-plex-mono)] text-[#999] uppercase pt-1">
                    {row.stage}
                  </span>
                  <span className="flex flex-wrap gap-1.5">
                    {row.types.map((type) => (
                      <span
                        key={type}
                        className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] text-[#c9c6be] border border-[#2a2a2a] rounded px-2 py-0.5"
                      >
                        {type}
                      </span>
                    ))}
                  </span>
                </li>
              ))}
            </ul>

            <p className="text-[13.5px] text-[#666] leading-relaxed max-w-md">
              A progress report, not the run&apos;s log. The agent&apos;s own
              working notes — each tool call, its arguments, the model&apos;s
              text — are not part of the public API at any depth, so a UI built
              on the stream survives a release that changes nothing you can
              see. The Result row lands after the run is already over, days
              later for a sleeping panel; read it back from the timeline.
            </p>
          </div>

          <CodeBlock code={WATCH} filename="watch.ts" />
        </div>
      </div>
    </section>
  );
}
