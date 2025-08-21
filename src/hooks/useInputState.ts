import { useState, useCallback } from 'react';
import type { ChangeEvent } from 'react';

interface UseInputStateOptions {
  validate?: (value: string) => string | undefined;
}

interface UseInputStateReturn {
  value: string;
  error: string | undefined;
  serverError: string | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDirectChange: (value: string) => void;
  setServerError: (error: string | null) => void;
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
  const [error, setError] = useState<string>();
  const [serverError, setServerError] = useState<string | null>(null);

  const onDirectChange = useCallback(
    (newValue: string) => {
      setValue(newValue);
      setServerError(null);
      if (validate) {
        const validationError = validate(newValue);
        setError(validationError);
      }
    },
    [validate],
  );

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onDirectChange(e.target.value);
    },
    [onDirectChange],
  );

  const resetError = useCallback(() => {
    setError(undefined);
    setServerError(null);
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
    serverError,
    onChange,
    onDirectChange,
    setServerError,
    resetError,
    resetValue,
    reset,
  };
};
