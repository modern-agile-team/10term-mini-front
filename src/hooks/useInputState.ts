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
  validate: (value: string) => void; // validate 함수 추가
}

export const useInputState = (
  initialValue: string = '',
  options: UseInputStateOptions = {},
): UseInputStateReturn => {
  const { validate: validateOption } = options;

  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState<string>();
  const [serverError, setServerError] = useState<string | null>(null);

  const onDirectChange = useCallback(
    (newValue: string) => {
      setValue(newValue);
      setServerError(null);
      if (validateOption) {
        const validationError = validateOption(newValue);
        setError(validationError);
      }
    },
    [validateOption],
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

  const validate = useCallback(
    (value: string) => {
      if (validateOption) {
        const validationError = validateOption(value);
        setError(validationError);
      }
    },
    [validateOption],
  );

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
    validate, // validate 함수 반환
  };
};

export default useInputState;
