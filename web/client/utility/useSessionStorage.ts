
import { useEffect, useState } from "react";

export const useSessionStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    const item = sessionStorage.getItem(key);
    // if (item) {
    //   setStoredValue(JSON.parse(item));
    // }
  }, [key]);

  const setSessionStorage = (value: T) => {
    setStoredValue(value);
    sessionStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setSessionStorage] as const;
};