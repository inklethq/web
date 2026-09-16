import { API_BASE_URL, DOCS_HTTP_URL } from "@/data/sdk";

type Method = "GET" | "POST";

type Endpoint = {
  method: Method;
  /** Relative to `/api/sdk/v1`. */
  path: string;
  title: string;
  /** The operationId, which is the page slug on the docs site. */
  slug: string;
};

/**
 * The public HTTP API, grouped the way the docs group it. Each row links to
 * that operation's reference page, generated from the OpenAPI contract.
 */
const groups: { tag: string; slug: string; endpoints: Endpoint[] }[] = [
  {
    tag: "Displays",
    slug: "displays",
    endpoints: [
      { method: "GET", path: "/displays", title: "List displays", slug: "listDisplays" },
      { method: "GET", path: "/displays/{id}", title: "Retrieve a display", slug: "retrieveDisplay" },
      { method: "GET", path: "/displays/{id}/queue", title: "List a display queue", slug: "listDisplayQueue" },
      { method: "GET", path: "/displays/{id}/current-presentation", title: "Retrieve the confirmed presentation", slug: "retrieveCurrentPresentation" },
      { method: "POST", path: "/displays/{id}/current", title: "Put a presentation on the panel", slug: "setCurrentPresentation" },
      { method: "POST", path: "/displays/{id}/advance", title: "Advance to the next queued presentation", slug: "advanceDisplay" },
    ],
  },
  {
    tag: "Contents",
    slug: "contents",
    endpoints: [
      { method: "GET", path: "/contents", title: "List contents", slug: "listContents" },
      { method: "POST", path: "/contents", title: "Create content", slug: "createContent" },
      { method: "GET", path: "/contents/{id}", title: "Retrieve content", slug: "retrieveContent" },
      { method: "POST", path: "/contents/{id}/upload-tickets", title: "Refresh upload tickets", slug: "refreshContentUploadTickets" },
    ],
  },
  {
    tag: "Analyses",
    slug: "analyses",
    endpoints: [
      { method: "GET", path: "/analyses", title: "List analyses", slug: "listAnalyses" },
      { method: "POST", path: "/analyses", title: "Create an analysis", slug: "createAnalysis" },
      { method: "GET", path: "/analyses/{id}", title: "Retrieve an analysis", slug: "retrieveAnalysis" },
      { method: "GET", path: "/analyses/{id}/events", title: "List analysis events", slug: "listAnalysisEvents" },
      { method: "GET", path: "/analyses/{id}/events/stream", title: "Stream analysis events", slug: "streamAnalysisEvents" },
      { method: "GET", path: "/analyses/{id}/archive", title: "Retrieve the run archive", slug: "retrieveAnalysisArchive" },
    ],
  },
  {
    tag: "Presentations",
    slug: "presentations",
    endpoints: [
      { method: "GET", path: "/presentations", title: "List presentations", slug: "listPresentations" },
      { method: "GET", path: "/presentations/{id}", title: "Retrieve a presentation", slug: "retrievePresentation" },
      { method: "POST", path: "/presentations/{id}/renditions", title: "Render a stored scene again", slug: "createPresentationRendition" },
    ],
  },
];

const methodColor: Record<Method, string> = {
  GET: "text-[#9ece6a]",
  POST: "text-[#7aa2f7]",
};

/** Where "browse the reference" lands: the first page of the HTTP API docs. */
const REFERENCE_URL = `${DOCS_HTTP_URL}/displays/listDisplays`;

/** One operation, laid out the way its reference page is. */
const featured = {
  method: "GET" as Method,
  path: "/api/sdk/v1/displays",
  href: REFERENCE_URL,
  description: "Returns the displays bound to the personal access token owner.",
  parameters: [
    {
      name: "cursor",
      type: "string",
      description: "Opaque cursor returned by the previous page.",
      chips: [] as { label: string; value: string }[],
    },
    {
      name: "limit",
      type: "integer",
      description: "Number of items to return.",
      chips: [
        { label: "Range", value: "1 <= value <= 50" },
        { label: "Default", value: "20" },
      ],
    },
  ],
  responses: ["200", "400", "401", "429"],
};

function EndpointCard() {
  return (
    <div className="bg-[#111] border border-[#2a2a2a] rounded-xl p-6">
      <div className="flex items-center gap-3 border border-[#2a2a2a] rounded-lg px-4 py-2.5 font-[family-name:var(--font-ibm-plex-mono)] text-[12.5px]">
        <span className={`text-[11px] tracking-wider ${methodColor[featured.method]}`}>
          {featured.method}
        </span>
        <span className="text-[#c9c6be]">{featured.path}</span>
      </div>
      <p className="text-[14px] text-[#888] leading-relaxed mt-4">
        {featured.description}
      </p>

      <h4 className="font-[family-name:var(--font-newsreader)] text-lg mt-8 mb-1">
        Query Parameters
      </h4>
      <div className="divide-y divide-[#2a2a2a]">
        {featured.parameters.map((param) => (
          <div key={param.name} className="py-3.5">
            <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[12.5px]">
              <span className="text-[#f5f3ed]">{param.name}</span>
              <span className="text-[#555]">? {param.type}</span>
            </p>
            <p className="text-[13px] text-[#888] leading-relaxed mt-1">
              {param.description}
            </p>
            {param.chips.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2.5">
                {param.chips.map((chip) => (
                  <span
                    key={chip.label}
                    className="inline-flex items-baseline gap-1.5 border border-[#2a2a2a] rounded px-2 py-1 text-[11px]"
                  >
                    <span className="text-[#888]">{chip.label}</span>
                    <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[#c9c6be]">
                      {chip.value}
                    </span>
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <h4 className="font-[family-name:var(--font-newsreader)] text-lg mt-6 mb-1">
        Response Body
      </h4>
      <ul className="divide-y divide-[#2a2a2a]">
        {featured.responses.map((code) => (
          <li key={code} className="flex items-baseline justify-between py-2.5">
            <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[12.5px] text-[#c9c6be]">
              {code}
            </span>
            <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] text-[#555]">
              application/json
            </span>
          </li>
        ))}
      </ul>

      <a
        href={featured.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-7 text-[13px] text-[#c9c6be] hover:text-[#f5f3ed] transition-colors"
      >
        Open in the reference
        <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

export default function SdkResources() {
  return (
    <section className="py-32 border-t border-[#2a2a2a]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <p className="eyebrow text-[#777] mb-3">
            Reference
          </p>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 md:gap-8">
            <h2 className="font-[family-name:var(--font-newsreader)] text-3xl md:text-4xl font-light leading-snug">
              Every call, documented.
            </h2>
            <a
              href={REFERENCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center self-start md:self-auto shrink-0 px-6 py-2.5 border border-[#333] text-[#c9c6be] rounded-full text-sm font-medium hover:border-[#555] hover:text-[#f5f3ed] transition-colors"
            >
              Browse the HTTP API reference
            </a>
          </div>
          <p className="text-[#888] leading-relaxed max-w-xl mt-5">
            The SDK is a thin, typed layer over the HTTP API — one method per
            endpoint, nothing hidden. Parameters, response shapes, error codes,
            and a TypeScript SDK snippet for every call live in the reference.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-16 items-start">
          <EndpointCard />

          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
              {groups.map((group) => (
                <div key={group.tag}>
                  <h3 className="text-sm font-[family-name:var(--font-ibm-plex-mono)] text-[#999] uppercase mb-3">
                    {group.tag}
                  </h3>
                  <ul className="border-t border-[#2a2a2a]">
                    {group.endpoints.map((endpoint) => (
                      <li key={endpoint.slug} className="border-b border-[#2a2a2a]">
                        <a
                          href={`${DOCS_HTTP_URL}/${group.slug}/${endpoint.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-baseline gap-3 py-2.5"
                        >
                          <span
                            className={`w-9 shrink-0 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] tracking-wider ${methodColor[endpoint.method]}`}
                          >
                            {endpoint.method}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-[13px] text-[#c9c6be] group-hover:text-[#f5f3ed] transition-colors">
                              {endpoint.title}
                            </span>
                            <span className="block font-[family-name:var(--font-ibm-plex-mono)] text-[11px] text-[#555] truncate">
                              {endpoint.path}
                            </span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="text-[12px] text-[#555] mt-8 font-[family-name:var(--font-ibm-plex-mono)]">
              All paths are under {API_BASE_URL.replace("https://", "")}/api/sdk/v1
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
