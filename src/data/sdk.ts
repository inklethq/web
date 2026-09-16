/**
 * Facts about the published SDK, kept in one place because they are quoted on
 * the home page, the SDK page, and in structured data. Everything here tracks
 * `@inklethq/sdk` — when the package ships a release, this file moves with it.
 */

export const PACKAGE_NAME = "@inklethq/sdk";
export const SDK_VERSION = "0.2.2";

export const GITHUB_URL = "https://github.com/inklethq/sdk";
export const CHANGELOG_URL = `${GITHUB_URL}/blob/main/CHANGELOG.md`;
export const NPM_URL = "https://www.npmjs.com/package/@inklethq/sdk";
export const DOCS_URL = "https://docs.iminklet.com";
/** The HTTP API reference, generated from the OpenAPI contract. */
export const DOCS_HTTP_URL = `${DOCS_URL}/http`;

/**
 * `DEFAULT_INKLET_BASE_URL` in the SDK. The service is still on the developer
 * preview host; `baseUrl` is how a caller points at a Compute Hub instead.
 */
export const API_BASE_URL = "https://dev.iminklet.com";

/** Limits the SDK enforces before a request leaves the process. */
export const MAX_ASSET_SIZE_MIB = 10;
export const MAX_ASSETS_PER_CONTENT = 50;

/** Event types a public Analysis stream can carry. A closed set, by design. */
export const ANALYSIS_EVENT_TYPE_COUNT = 16;
