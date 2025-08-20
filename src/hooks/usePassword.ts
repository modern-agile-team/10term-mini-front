import { useState, useEffect } from 'react';
import { useInputState } from '@/hooks/useInputState';
import { passwordRegex } from '@/constants/regex.constants';

interface UsePasswordReturn {
  currentPassword: string;
  currentPasswordError: string | null;
  onCurrentPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  serverCurrentPasswordError: string | null;

  newPassword: string;
  newPasswordError: string | null;
  onNewPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  serverNewPasswordError: string | null;

  confirmPassword: string;
  confirmPasswordError: string | null;
  onConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  isPasswordValid: boolean;
}

export function usePassword(): UsePasswordReturn {
  const {
    value: currentPassword,
    error: currentPasswordError,
    onChange: onCurrentPasswordChange,
  } = useInputState('', {
    validate: (value) => (!value.trim() ? '현재 비밀번호를 입력해주세요' : null),
  });

  const {
    value: newPassword,
    error: newPasswordError,
    onChange: onNewPasswordChange,
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
    value: confirmPassword,
    error: confirmPasswordError,
    onChange: onConfirmPasswordChange,
  } = useInputState('', {
    validate: (value) => {
      if (!newPassword) return null;
      if (value !== newPassword) return '비밀번호가 일치하지 않습니다';
      return null;
    },
  });

  const [serverCurrentPasswordError, setServerCurrentPasswordError] = useState<string | null>(null);
  const [serverNewPasswordError, setServerNewPasswordError] = useState<string | null>(null);

  useEffect(() => {
    setServerCurrentPasswordError(null);
  }, [currentPassword]);

  useEffect(() => {
    setServerNewPasswordError(null);
  }, [newPassword]);

  const isPasswordValid = Boolean(
    newPassword &&
      confirmPassword &&
      !newPasswordError &&
      !confirmPasswordError &&
      !serverNewPasswordError,
  );

  return {
    currentPassword,
    currentPasswordError,
    onCurrentPasswordChange,
    serverCurrentPasswordError,

    newPassword,
    newPasswordError,
    onNewPasswordChange,
    serverNewPasswordError,

    confirmPassword,
    confirmPasswordError,
    onConfirmPasswordChange,

    isPasswordValid,
  };
}
