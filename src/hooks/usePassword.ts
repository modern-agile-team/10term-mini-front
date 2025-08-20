import { useState, useEffect } from 'react';
import { useInputState } from '@/hooks/useInputState';
import { passwordRegex } from '@/constants/regex.constants';

interface UsePasswordReturn {
  current: string;
  currentError: string | null;
  onCurrentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  serverCurrentError: string | null;

  new: string;
  newError: string | null;
  onNewChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  serverNewError: string | null;

  confirm: string;
  confirmError: string | null;
  onConfirmChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  isValid: boolean;
}

export function usePassword(): UsePasswordReturn {
  const {
    value: current,
    error: currentError,
    onChange: onCurrentChange,
  } = useInputState('', {
    validate: (value) => (!value.trim() ? '현재 비밀번호를 입력해주세요' : null),
  });

  const {
    value: newPassword,
    error: newError,
    onChange: onNewChange,
  } = useInputState('', {
    validate: (value) => {
      if (!value) return null;
      if (!passwordRegex.test(value)) {
        return '비밀번호는 8~20자이며, 영문자, 숫자, 특수문자를 각각 1자 이상 포함해야 합니다';
      }
      return null;
    },
  });

  const {
    value: confirm,
    error: confirmError,
    onChange: onConfirmChange,
  } = useInputState('', {
    validate: (value) => {
      if (!newPassword) return null;
      if (value !== newPassword) return '비밀번호가 일치하지 않습니다';
      return null;
    },
  });

  const [serverCurrentError, setServerCurrentError] = useState<string | null>(null);
  const [serverNewError, setServerNewError] = useState<string | null>(null);

  useEffect(() => {
    setServerCurrentError(null);
  }, [current]);

  useEffect(() => {
    setServerNewError(null);
  }, [newPassword]);

  const isValid = Boolean(newPassword && confirm && !newError && !confirmError && !serverNewError);

  return {
    current,
    currentError,
    onCurrentChange,
    serverCurrentError,

    new: newPassword,
    newError,
    onNewChange,
    serverNewError,

    confirm,
    confirmError,
    onConfirmChange,

    isValid,
  };
}
