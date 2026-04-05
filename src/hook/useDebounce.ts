import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set a timer to update the value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // CLEANUP: If the user types again before the delay finishes, 
    // this clears the old timer and starts a new one.
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}