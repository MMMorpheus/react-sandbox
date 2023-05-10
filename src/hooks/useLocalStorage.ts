import { useState, useCallback } from "react";

type UseLocalStorage = (
  key: string,
  initialvalue: any
) => [storedValue: any, setValue: <T>(value: T) => void];

export const useLocalStorage: UseLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = useCallback(
    <T>(value: T) => {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    },
    [key]
  );
  return [storedValue, setValue];
};
