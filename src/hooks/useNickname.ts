import { requestNicknameCheck } from '@/apis/myPage';
import { nicknameRegex } from '@/constants/regex.constants';
import { useInputState } from '@/hooks/useInputState';
import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';

interface UseNicknameReturn {
  nickname: string;
  nicknameError: string | null;
  onNicknameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  serverError: string | null;
  isValid: boolean;
  handleCheck: () => Promise<void>;
}

export function useNickname(initialNickname: string): UseNicknameReturn {
  const {
    value: nickname,
    error: nicknameError,
    onChange: onNicknameChange,
  } = useInputState(initialNickname, {
    validate: (value: string): string | null => {
      if (!value.trim()) return '닉네임을 입력해주세요';
      if (!nicknameRegex.test(value)) {
        return '닉네임은 한글 10자, 영문/숫자 30자 이내로 구성되어야 합니다';
      }
      return null;
    },
  });

  const [serverError, setServerError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    setServerError(null);
    setIsValid(false);
  }, [nickname]);

  const handleCheck = async (): Promise<void> => {
    if (nicknameError) return;

    try {
      const isAvailable = await requestNicknameCheck(nickname);

      if (isAvailable) {
        setServerError(null);
        setIsValid(true);
      } else {
        setServerError('이미 사용 중인 닉네임입니다.');
        setIsValid(false);
      }
    } catch (error) {
      setServerError('닉네임 중복 확인 중 오류가 발생했습니다');
      setIsValid(false);
    }
  };

  return {
    nickname,
    nicknameError,
    onNicknameChange,
    serverError,
    isValid,
    handleCheck,
  };
}
