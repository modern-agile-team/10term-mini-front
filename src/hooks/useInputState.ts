import { useState, useCallback } from 'react';
import type { ChangeEvent } from 'react';

interface UseInputStateOptions {
  validate?: (value: string) => string | null | undefined;
}

interface UseInputStateReturn {
  value: string;
  error: string | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setValue: (value: string) => void;
  resetError: () => void;
  resetValue: () => void;
  reset: () => void;
}

export const useInputState = (
  initialValue: string = '',
  options: UseInputStateOptions = {},
): UseInputStateReturn => {
  const { validate } = options;

  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState<string | null>(null);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);

      if (validate) {
        const validationError = validate(newValue);
        setError(validationError ?? null);
      }
    },
    [validate],
  );

  const setDirectValue = useCallback(
    (newValue: string) => {
      setValue(newValue);
      if (validate) {
        const validationError = validate(newValue);
        setError(validationError ?? null);
      }
    },
    [validate],
  );

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  const resetValue = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);

  const reset = useCallback(() => {
    resetValue();
    resetError();
  }, [resetValue, resetError]);

  return {
    value,
    error,
    onChange,
    setValue: setDirectValue,
    resetError,
    resetValue,
    reset,
  };
};
