import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";
import {
  ANALYSIS_EVENT_TYPE_COUNT,
  API_BASE_URL,
  MAX_ASSETS_PER_CONTENT,
  MAX_ASSET_SIZE_MIB,
} from "@/data/sdk";

const ERRORS = `import {
  InkletError,
  PermissionDeniedError,
  RateLimitError,
} from "@inklethq/sdk";

try {
  await inklet.analyze({ contentIds: [content.id] });
} catch (error) {
  if (
    error instanceof PermissionDeniedError &&
    error.code === "plan_upgrade_required"
  ) {
    // A Pro-only run on the Free plan. Upgrade, then retry.
  } else if (error instanceof RateLimitError) {
    // quota_exceeded clears at details.resetAt;
    // rate_limited clears after error.retryAfterMs.
  } else if (error instanceof InkletError) {
    console.error(error.code, error.requestId, error.details);
  }
}`;

const guardrails = [
  {
    title: "Server-only, by construction",
    body: "Constructing the client where a document exists throws before a request is made. A personal access token cannot end up in a browser bundle by accident.",
  },
  {
    title: "Uploads never carry the token",
    body: "Binary assets go straight to temporary storage URLs. The token is sent only to inklet endpoints, and requests refuse absolute URLs and follow no redirects.",
  },
  {
    title: "Safe to replay",
    body: "Every Content and every Analysis is created under an idempotency key — yours, or one the SDK generates and hands back. Replaying a key returns the original resource, and the same key with a different body is a conflict. An error from such a call carries the key it used, so a retry is the same call, never a second one.",
  },
  {
    title: "Errors you can act on",
    body: "Every error extends InkletError and keeps the backend code, HTTP status, request ID, and structured details. The class comes from the status; the code and details are the stable parts. Messages are for logs — never branch on them.",
  },
  {
    title: "Bounded in time",
    body: "Every request has a timeout — 60 seconds, and five minutes for a storage upload — and every call takes a signal and a timeoutMs of its own. The waiting helpers and timeline() ride out up to three transient failures with back-off and honour Retry-After, and watch() reconnects where it left off. Calls that create or change something are never retried for you.",
  },
  {
    title: "Open to what the backend adds",
    body: "Fields the backend reports as a fixed set of words — a state, a mode, an activity's kind — are typed as the values this SDK knows plus any other string. A value it has never seen reads through, a waiting helper treats an unknown state as not finished, and nothing installed breaks.",
  },
];

export default function SdkGuardrails() {
  return (
    <section className="py-32 border-t border-[#2a2a2a]">
      <div className="max-w-6xl mx-auto px-6">
        <p className="eyebrow text-[#777] mb-3">
          Guardrails
        </p>
        <h2 className="font-[family-name:var(--font-newsreader)] text-3xl md:text-4xl font-light mb-16 max-w-2xl leading-snug">
          A key that reaches your walls deserves care.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-12 mb-20">
          {guardrails.map((item) => (
            <div key={item.title}>
              <h3 className="font-[family-name:var(--font-newsreader)] text-xl mb-3">
                {item.title}
              </h3>
              <p className="text-[#888] leading-relaxed text-[15px] max-w-md">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <CodeBlock code={ERRORS} filename="errors.ts" />

          <div className="space-y-8">
            <div>
              <h3 className="font-[family-name:var(--font-newsreader)] text-xl mb-3">
                Choose where requests go
              </h3>
              <p className="text-[#888] leading-relaxed text-[15px] max-w-md">
                Requests go to{" "}
                <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[13px] text-[#c9c6be]">
                  {API_BASE_URL.replace("https://", "")}
                </span>{" "}
                by default.{" "}
                <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[13px] text-[#c9c6be]">
                  baseUrl
                </span>{" "}
                points the same code at another inklet service — a local or
                test instance today, and a{" "}
                <Link
                  href="/hub"
                  className="text-[#c9c6be] underline underline-offset-4 decoration-[#444] hover:text-[#f5f3ed] hover:decoration-[#888] transition-colors"
                >
                  Compute Hub
                </Link>{" "}
                on your own network once Hub ships, so nothing has to leave it.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-10 gap-y-4 pt-6 border-t border-[#2a2a2a]">
              <div>
                <p className="font-[family-name:var(--font-ibm-plex-mono)] text-2xl text-[#f5f3ed] font-light">
                  {MAX_ASSET_SIZE_MIB} MiB
                </p>
                <p className="text-[12.5px] text-[#666] mt-1">
                  per binary asset
                </p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-ibm-plex-mono)] text-2xl text-[#f5f3ed] font-light">
                  {MAX_ASSETS_PER_CONTENT}
                </p>
                <p className="text-[12.5px] text-[#666] mt-1">
                  assets per Content
                </p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-ibm-plex-mono)] text-2xl text-[#f5f3ed] font-light">
                  {ANALYSIS_EVENT_TYPE_COUNT}
                </p>
                <p className="text-[12.5px] text-[#666] mt-1">
                  event types, a closed set
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
