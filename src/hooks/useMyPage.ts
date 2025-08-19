import { useEffect, useMemo, useState } from 'react';
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

export function useMyPage() {
  const navigate = useNavigate();

  const [user, setUser] = useLocalStorage<User>('user', {
    username: '',
    nickname: '',
  });

  const [nickname, setNickname] = useState(user.nickname);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [isNicknameTouched, setNicknameTouched] = useState(false);
  const [isCurrentPasswordTouched, setCurrentPasswordTouched] = useState(false);
  const [isNewPasswordTouched, setNewPasswordTouched] = useState(false);
  const [isConfirmNewPasswordTouched, setConfirmNewPasswordTouched] = useState(false);

  const [serverNicknameError, setServerNicknameError] = useState<string | null>(null);
  const [serverCurrentPasswordError, setServerCurrentPasswordError] = useState<string | null>(null);
  const [serverNewPasswordError, setServerNewPasswordError] = useState<string | null>(null);

  const [isNicknameValid, setIsNicknameValid] = useState(false);

  useEffect(() => {
    setServerNicknameError(null);
  }, [nickname]);
  useEffect(() => {
    setServerCurrentPasswordError(null);
  }, [newPassword]);
  useEffect(() => {
    setServerNewPasswordError(null);
  }, [newPassword]);

  const nicknameError = useMemo(() => {
    if (serverNicknameError) return serverNicknameError;
    if (!isNicknameTouched) return null;
    if (nickname.trim() === '') return '닉네임을 입력해주세요.';

    const hasHangul = /[가-힣]/.test(nickname);
    const maxLength = hasHangul ? 10 : 30;

    if (nickname.length > maxLength || !nicknameRegex.test(nickname)) {
      return '닉네임은 한글 10자, 영문/숫자 30자 이내로 구성되어야 합니다.';
    }
    return null;
  }, [nickname, isNicknameTouched, serverNicknameError]);

  const currentPasswordError = useMemo(() => {
    if (serverCurrentPasswordError) return serverCurrentPasswordError;
    if (!isCurrentPasswordTouched) return null;
    if (currentPassword.trim() === '') return '현재 비밀번호를 입력해주세요.';
    return null;
  }, [currentPassword, isCurrentPasswordTouched, serverCurrentPasswordError]);

  const newPasswordError = useMemo(() => {
    if (serverNewPasswordError) return serverNewPasswordError;
    if (!isNewPasswordTouched) return null;
    if (newPassword.trim() === '') return '새 비밀번호를 입력해주세요.';
    if (!passwordRegex.test(newPassword)) {
      return '비밀번호는 8~20자이며, 영문자, 숫자, 특수문자를 각각 1자 이상 포함해야 합니다.';
    }
    return null;
  }, [newPassword, isNewPasswordTouched, serverNewPasswordError]);

  const confirmNewPasswordError = useMemo(() => {
    if (!isConfirmNewPasswordTouched) return null;
    if (confirmNewPassword.trim() === '') return '비밀번호 확인을 입력해주세요.';
    if (newPassword !== confirmNewPassword) return '비밀번호가 일치하지 않습니다.';
    return null;
  }, [newPassword, confirmNewPassword, isConfirmNewPasswordTouched]);

  const isPasswordValid =
    newPassword && confirmNewPassword && !newPasswordError && !confirmNewPasswordError;
  const isFormValid = isNicknameValid || isPasswordValid;

  const handleCheckNickname = async () => {
    try {
      const isAvailable = await requestNicknameCheck(nickname);
      if (isAvailable) {
        setServerNicknameError(null);
        setIsNicknameValid(true);
      } else {
        setServerNicknameError('이미 사용 중인 닉네임입니다.');
        setIsNicknameValid(false);
      }
    } catch {
      setIsNicknameValid(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (isNicknameValid) {
        await requestNicknameUpdate(nickname);
        const userInfoResponse = await requestUserInfo();
        const updatedNickname = userInfoResponse;
        setUser({ ...user, ...updatedNickname });
      }

      if (isPasswordValid) {
        await requestPasswordUpdate(currentPassword, newPassword);
        await requestLogout();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        alert('비밀번호가 변경되어 로그아웃됩니다.');
        window.location.href = '/login';
        return;
      }

      alert('변경 완료');
      window.location.reload();
    } catch (err) {
      console.error('변경 처리 중 오류 발생:', err);
      alert('변경에 실패했습니다.');
    }
  };

  const handleBack = () => {
    if (window.history.length > 2) window.history.back();
    else navigate('/');
  };

  return {
    nickname,
    setNickname,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    nicknameError,
    currentPasswordError,
    newPasswordError,
    confirmNewPasswordError,
    isNicknameTouched,
    isCurrentPasswordTouched,
    isNewPasswordTouched,
    isConfirmNewPasswordTouched,
    setNicknameTouched,
    setCurrentPasswordTouched,
    setNewPasswordTouched,
    setConfirmNewPasswordTouched,
    handleCheckNickname,
    handleSubmit,
    handleBack,
    isNicknameValid,
    isPasswordValid,
    isFormValid,
  };
}
