import { createPageMetadata } from "@/lib/metadata";
import { LAST_UPDATED, TERMS_OF_SERVICE_HTML } from "@/data/terms-of-service";

export const metadata = createPageMetadata({
  title: "Terms of Service - inklet",
  description:
    "The terms that govern your use of inklet Portal, the inklet apps, the developer API and SDK, and inklet displays connected to them.",
  path: "/terms-of-service",
});

export default function TermsOfServicePage() {
  return (
    <section className="pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <header className="mb-12 pb-8 border-b border-[#e8e5db]">
          <p className="eyebrow text-[#aaa] mb-4">
            Legal
          </p>
          <h1 className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl font-light text-[#1a1a1a] mb-4">
            Terms of Service
          </h1>
          <p className="text-sm text-[#888]">Last updated: {LAST_UPDATED}</p>
        </header>

        <div
          className="legal"
          dangerouslySetInnerHTML={{ __html: TERMS_OF_SERVICE_HTML }}
        />
      </div>
    </section>
  );
}
