import { requestNicknameCheck } from '@/apis/myPage';
import { nicknameRegex } from '@/constants';
import { useInputState } from '@/hooks';
import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';

interface UseNicknameReturn {
  nickname: string;
  nicknameError: string | undefined | null;
  onNicknameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  serverNicknameError: string | null;
  isNicknameValid: boolean;
  handleCheckNickname: () => Promise<void>;
}

export function useNickname(initialNickname: string): UseNicknameReturn {
  const {
    value: nickname,
    error: nicknameError,
    onChange: onNicknameChange,
  } = useInputState(initialNickname, {
    validate: (value: string): string | undefined => {
      if (!value.trim()) return '닉네임을 입력해주세요';
      if (!nicknameRegex.test(value)) {
        return '닉네임은 한글 10자, 영문/숫자 30자 이내로 구성되어야 합니다';
      }
      return undefined;
    },
  });

  const [serverNicknameError, setserverNicknameError] = useState<string | null>(null);
  const [isNicknameValid, setIsNicknameValid] = useState<boolean>(false);

  useEffect(() => {
    setserverNicknameError(null);
    setIsNicknameValid(false);
  }, [nickname]);

  const handleCheckNickname = async (): Promise<void> => {
    if (nicknameError) return;

    try {
      const isAvailable = await requestNicknameCheck(nickname);

      if (isAvailable) {
        setserverNicknameError(null);
        setIsNicknameValid(true);
      } else {
        setserverNicknameError('이미 사용 중인 닉네임입니다.');
        setIsNicknameValid(false);
      }
    } catch (error) {
      setserverNicknameError('닉네임 중복 확인 중 오류가 발생했습니다');
      setIsNicknameValid(false);
    }
  };

  return {
    nickname,
    nicknameError,
    onNicknameChange,
    serverNicknameError,
    isNicknameValid,
    handleCheckNickname,
  };
}

export default useNickname;
