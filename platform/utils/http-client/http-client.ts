export type Transport = (request: Request) => Promise<Response>;

export type HttpClientOptions = {
  /** prefix for every request path, e.g. `https://api.acme.example/v1`. */
  baseUrl?: string;
  /** headers sent on every request, e.g. an auth token. */
  headers?: Record<string, string>;
  /** how requests leave the client. defaults to the global `fetch`. */
  transport?: Transport;
};

/** A non-2xx response. Carries the status so callers can branch on it. */
export class HttpError extends Error {
  constructor(
    readonly status: number,
    readonly url: string,
    readonly body?: unknown
  ) {
    super(`request to ${url} failed with ${status}`);
    this.name = 'HttpError';
  }
}

export type HttpClient = {
  get<T>(path: string): Promise<T>;
  post<T>(path: string, body?: unknown): Promise<T>;
  put<T>(path: string, body?: unknown): Promise<T>;
  delete<T>(path: string): Promise<T>;
};

/**
 * A small JSON client over `fetch`. Every ACME data hook talks to the backend
 * through it, so swapping the transport (for tests, previews or a mock
 * backend) never touches the hooks.
 */
export function createHttpClient({ baseUrl = '', headers = {}, transport }: HttpClientOptions = {}): HttpClient {
  const send = transport ?? ((request: Request) => fetch(request));

  async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
    // A relative path resolves against the page in a browser; outside one
    // (tests, SSR, Node) there is no page, so fall back to localhost.
    const url = baseUrl
      ? `${baseUrl.replace(/\/$/, '')}${path}`
      : new URL(path, globalThis.location?.href ?? 'http://localhost').toString();
    const response = await send(
      new Request(url, {
        method,
        headers: { accept: 'application/json', ...(body === undefined ? {} : { 'content-type': 'application/json' }), ...headers },
        body: body === undefined ? undefined : JSON.stringify(body),
      })
    );
    const text = await response.text();
    const data = text ? JSON.parse(text) : undefined;
    if (!response.ok) throw new HttpError(response.status, url, data);
    return data as T;
  }

  return {
    get: (path) => request('GET', path),
    post: (path, body) => request('POST', path, body),
    put: (path, body) => request('PUT', path, body),
    delete: (path) => request('DELETE', path),
  };
}

export type MockRoutes = Record<string, (request: Request) => unknown | Promise<unknown>>;

/**
 * An in-memory transport for previews, tests and demos. Routes are keyed by
 * `METHOD /path`; an unknown route answers 404.
 *
 * @example
 * createHttpClient({ transport: createMockTransport({ 'GET /products': () => products }) })
 */
export function createMockTransport(routes: MockRoutes, { latencyMs = 0 } = {}): Transport {
  return async (request) => {
    const { pathname } = new URL(request.url, 'http://mock.local');
    const handler = routes[`${request.method} ${pathname}`];
    if (latencyMs) await new Promise((resolve) => setTimeout(resolve, latencyMs));
    if (!handler) return new Response(JSON.stringify({ error: 'not found' }), { status: 404 });
    const result = await handler(request);
    return new Response(result === undefined ? '' : JSON.stringify(result), { status: 200 });
  };
}
