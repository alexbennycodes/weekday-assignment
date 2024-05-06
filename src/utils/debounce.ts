type AnyFunction = (...args: unknown[]) => unknown;

interface DebouncedFunction<F extends AnyFunction> {
  (...args: Parameters<F>): void;
}

export function debounce<F extends AnyFunction>(
  func: F,
  wait: number = 300
): DebouncedFunction<F> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return (...args: Parameters<F>): void => {
    // Clear any existing timeouts to prevent multiple executions
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }    // creates a new timeout to execute  after 'wait' ms
    timeoutId = setTimeout(() => func(...args), wait) as ReturnType<
      typeof setTimeout
    >;
  };
}
