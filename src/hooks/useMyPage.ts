import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import type { User } from '@/types/auth';
import useLocalStorage from '@/hooks/useLocalStorage';
import {
  requestNicknameCheck,
  requestNicknameUpdate,
  requestPasswordUpdate,
  requestUserInfo,
} from '@/apis/myPage';
import { requestLogout } from '@/apis/auth';
import { nicknameRegex, passwordRegex } from '@/constants/regex.constants';
import { useInputState } from '@/hooks/useInputState';

export function useMyPage() {
  const navigate = useNavigate();
  const [user, setUser] = useLocalStorage<User>('user', {
    username: '',
    nickname: '',
  });

  const {
    value: nickname,
    error: nicknameError,
    onChange: onNicknameChange,
  } = useInputState(user.nickname, {
    validate: (value) => {
      if (!value.trim()) return '닉네임을 입력해주세요';
      if (!nicknameRegex.test(value))
        return '닉네임은 한글 10자, 영문/숫자 30자 이내로 구성되어야 합니다';
      return null;
    },
  });

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
      if (!value) return null; // 빈 값은 허용
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
      if (!newPassword) return null; // 새 비밀번호가 없으면 검증 스킵
      if (value !== newPassword) return '비밀번호가 일치하지 않습니다';
      return null;
    },
  });

  const [serverNicknameError, setServerNicknameError] = useState<string | null>(null);
  const [serverCurrentPasswordError, setServerCurrentPasswordError] = useState<string | null>(null);
  const [serverNewPasswordError, setServerNewPasswordError] = useState<string | null>(null);
  const [isNicknameValid, setIsNicknameValid] = useState(false);

  useEffect(() => {
    setServerNicknameError(null);
    setIsNicknameValid(false);
  }, [nickname]);

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

  const isFormValid = isNicknameValid || isPasswordValid;

  const handleCheckNickname = async () => {
    if (nicknameError) return;

    try {
      const isAvailable = await requestNicknameCheck(nickname);
      if (isAvailable) {
        setServerNicknameError(null);
        setIsNicknameValid(true);
      } else {
        setServerNicknameError('이미 사용 중인 닉네임입니다');
        setIsNicknameValid(false);
      }
    } catch (error) {
      setServerNicknameError('닉네임 중복 확인 중 오류가 발생했습니다');
      setIsNicknameValid(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (isNicknameValid) {
        await requestNicknameUpdate(nickname);
        const userInfoResponse = await requestUserInfo();
        setUser({ ...user, ...userInfoResponse });
      }

      if (isPasswordValid) {
        await requestPasswordUpdate(currentPassword, newPassword);
        await requestLogout();
        localStorage.clear();
        alert('비밀번호가 변경되었습니다. 다시 로그인해주세요.');
        window.location.href = '/login';
        return;
      }

      alert('변경이 완료되었습니다.');
      window.location.reload();
    } catch (error) {
      alert('변경 중 오류가 발생했습니다.');
      console.error('Error:', error);
    }
  };

  const handleBack = () => {
    if (window.history.length > 2) {
      window.history.back();
    } else {
      navigate('/');
    }
  };

  return {
    nickname,
    nicknameError,
    onNicknameChange,
    serverNicknameError,
    isNicknameValid,

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
    isFormValid,

    handleCheckNickname,
    handleSubmit,
    handleBack,
  };
}
