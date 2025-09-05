import { useInputState } from '@/hooks/useInputState';
import { passwordRegex } from '@/constants/regex.constants';
import { useEffect } from 'react';

interface UsePasswordReturn {
  currentPassword: string;
  currentPasswordError: string | undefined;
  serverCurrentPasswordError: string | null;
  onCurrentPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setServerCurrentPasswordError: (error: string | null) => void;

  newPassword: string;
  newPasswordError: string | undefined;
  serverNewPasswordError: string | null;
  onNewPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setServerNewPasswordError: (error: string | null) => void;

  confirmPassword: string;
  confirmPasswordError: string | undefined;
  onConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  isPasswordValid: boolean;
}

export function usePassword(): UsePasswordReturn {
  const {
    value: currentPassword,
    error: currentPasswordError,
    serverError: serverCurrentPasswordError,
    onChange: onCurrentPasswordChange,
    setServerError: setServerCurrentPasswordError,
  } = useInputState('', {
    validate: (value) => (!value.trim() ? '현재 비밀번호를 입력해주세요' : undefined),
  });

  const {
    value: newPassword,
    error: newPasswordError,
    serverError: serverNewPasswordError,
    onChange: onNewPasswordChange,
    setServerError: setServerNewPasswordError,
  } = useInputState('', {
    validate: (value) => {
      if (!value) return undefined;
      if (!passwordRegex.test(value)) {
        return '비밀번호는 8~20자이며, 영문자, 숫자, 특수문자를 각각 1자 이상 포함해야 합니다';
      }
      return undefined;
    },
  });

  const {
    value: confirmPassword,
    error: confirmPasswordError,
    onChange: onConfirmPasswordChange,
    validate: validateConfirmPassword,
  } = useInputState('', {
    validate: (value) => {
      if (!newPassword) return undefined;
      if (value !== newPassword) return '비밀번호가 일치하지 않습니다';
      return undefined;
    },
  });

  useEffect(() => {
    if (confirmPassword) {
      validateConfirmPassword(confirmPassword);
    }
  }, [newPassword, confirmPassword, validateConfirmPassword]);

  const isPasswordValid = Boolean(
    currentPassword &&
      !currentPasswordError &&
      !serverCurrentPasswordError &&
      newPassword &&
      confirmPassword &&
      !newPasswordError &&
      !confirmPasswordError &&
      !serverNewPasswordError,
  );

  return {
    currentPassword,
    currentPasswordError,
    serverCurrentPasswordError,
    onCurrentPasswordChange,
    setServerCurrentPasswordError,

    newPassword,
    newPasswordError,
    serverNewPasswordError,
    onNewPasswordChange,
    setServerNewPasswordError,

    confirmPassword,
    confirmPasswordError,
    onConfirmPasswordChange,

    isPasswordValid,
  };
}

export default usePassword;
