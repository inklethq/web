import CodeBlock from "@/components/CodeBlock";

const ASK = `import { isAnalysisEvent } from "@inklethq/sdk";

const conversation = await inklet.conversations.create();

// One message, one round. The answer streams as it is written.
const { answer } = await inklet.conversations.reply(
  conversation.id,
  "When is my next dentist appointment?",
  { onDelta: (text) => process.stdout.write(text) },
);

console.log(answer.citations); // the notes it drew on
console.log(answer.actions);   // what it did for you

// Or send, and follow the round yourself — what a relay does.
const { reply } = await inklet.conversations.send(
  conversation.id,
  { text: "Put yesterday's card back on the kitchen panel." },
);
for await (const ev of inklet.analyses.watch(reply.analysisId)) {
  if (isAnalysisEvent(ev, "assistant.delta")) {
    process.stdout.write(ev.data.text);
  }
}`;

const facts = [
  ["reply()", "Sends, then follows the round until the answer is final"],
  ["send()", "Returns the reply's analysisId at once, for your own watch()"],
  ["retrieve()", "A Conversation with its last fifty Messages"],
  ["listMessages({ before })", "Pages further back"],
  ["rename() · delete()", "A manual title is never replaced by automatic naming"],
];

export default function SdkAsk() {
  return (
    <section className="py-32 border-t border-[#2a2a2a]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <p className="eyebrow text-[#777] mb-3">
              Ask
            </p>
            <h2 className="font-[family-name:var(--font-newsreader)] text-3xl md:text-4xl font-light mb-5 leading-snug">
              A conversation with everything you saved.
            </h2>
            <p className="text-[#888] leading-relaxed max-w-md mb-10">
              A Conversation is a chat with the knowledge base. Every message
              starts one round: the agent searches and reads the notes, answers
              with the ones it drew on, and — only when asked to — starts a
              card or puts an earlier Presentation back on a display. Behind
              each answer is an ordinary Analysis with mode chat, so the same
              event stream applies, and chat rounds stay out of the history of
              cards unless you ask for them.
            </p>

            <ul className="border-t border-[#2a2a2a] mb-8">
              {facts.map(([name, note]) => (
                <li
                  key={name}
                  className="grid grid-cols-[180px_1fr] gap-x-4 py-2.5 border-b border-[#2a2a2a]"
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

            <p className="text-[13.5px] text-[#666] leading-relaxed max-w-md">
              Asking is a Pro capability. A message is trimmed and refused
              before any request if it is blank or longer than 4,000
              characters, and a second message while the previous round is
              still running is a conflict rather than a queue.
            </p>
          </div>

          <CodeBlock code={ASK} filename="ask.ts" />
        </div>
      </div>
    </section>
  );
}
