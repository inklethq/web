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
    // rate_limited clears with back-off.
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
    body: "Binary assets go straight to temporary storage URLs. The token is sent only to inklet endpoints, and requests refuse absolute URLs and cross-origin redirects.",
  },
  {
    title: "Safe to replay",
    body: "Every Content and every Analysis is created under an idempotency key — yours, or one the SDK generates and hands back. Replaying a key returns the original resource, and the same key with a different body is a conflict, so a retry is the same call, never a second one.",
  },
  {
    title: "Errors you can act on",
    body: "Every error extends InkletError and keeps the backend code, HTTP status, request ID, and structured details. The class comes from the status; the code and details are the stable parts. Messages are for logs — never branch on them.",
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
                Or keep it off the cloud entirely
              </h3>
              <p className="text-[#888] leading-relaxed text-[15px] max-w-md">
                The service address defaults to{" "}
                <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[13px] text-[#c9c6be]">
                  {API_BASE_URL.replace("https://", "")}
                </span>{" "}
                while the SDK is in developer preview. Point{" "}
                <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[13px] text-[#c9c6be]">
                  baseUrl
                </span>{" "}
                at a{" "}
                <Link
                  href="/hub"
                  className="text-[#c9c6be] underline underline-offset-4 decoration-[#444] hover:text-[#f5f3ed] hover:decoration-[#888] transition-colors"
                >
                  Compute Hub
                </Link>{" "}
                instead and the same code runs without anything leaving your
                network.
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
