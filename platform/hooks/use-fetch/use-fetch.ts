import { useCallback, useEffect, useRef, useState } from 'react';

export type FetchState<T> = {
  data?: T;
  error?: Error;
  loading: boolean;
  /** run the loader again, e.g. after a mutation. */
  reload: () => void;
};

/**
 * Runs an async loader and tracks its data, error and loading state. A newer
 * run always wins: a slow earlier response never overwrites a fresh one.
 *
 * @param loader the async function that fetches the data.
 * @param deps re-run the loader when any of these change.
 */
export function useFetch<T>(loader: () => Promise<T>, deps: unknown[] = []): FetchState<T> {
  const [state, setState] = useState<{ data?: T; error?: Error; loading: boolean }>({ loading: true });
  const [version, setVersion] = useState(0);
  const latest = useRef(0);

  useEffect(() => {
    const run = ++latest.current;
    setState((previous) => ({ ...previous, loading: true }));
    loader().then(
      (data) => run === latest.current && setState({ data, loading: false }),
      (error: Error) => run === latest.current && setState({ error, loading: false })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, version]);

  const reload = useCallback(() => setVersion((current) => current + 1), []);
  return { ...state, reload };
}
