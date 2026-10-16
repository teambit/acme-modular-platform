import { renderHook, waitFor, act } from '@testing-library/react';
import { useFetch } from './use-fetch.js';

it('resolves data and clears loading', async () => {
  const { result } = renderHook(() => useFetch(async () => ['p-300']));
  expect(result.current.loading).toBe(true);
  await waitFor(() => expect(result.current.loading).toBe(false));
  expect(result.current.data).toEqual(['p-300']);
});

it('captures errors', async () => {
  const { result } = renderHook(() => useFetch(async () => { throw new Error('offline'); }));
  await waitFor(() => expect(result.current.error?.message).toBe('offline'));
});

it('reloads on demand', async () => {
  let calls = 0;
  const { result } = renderHook(() => useFetch(async () => ++calls));
  await waitFor(() => expect(result.current.data).toBe(1));
  act(() => result.current.reload());
  await waitFor(() => expect(result.current.data).toBe(2));
});
