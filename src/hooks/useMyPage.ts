import { useNavigate } from 'react-router';
import type { User } from '@/types/auth';
import useLocalStorage from '@/hooks/useLocalStorage';
import { requestNicknameUpdate, requestPasswordUpdate, requestUserInfo } from '@/apis/myPage';
import { requestLogout } from '@/apis/auth';
import { usePassword } from '@/hooks/usePassword';
import { useNickname } from '@/hooks/useNickname';

export function useMyPage() {
  const navigate = useNavigate();
  const [user, setUser] = useLocalStorage<User>('user', {
    username: '',
    nickname: '',
  });

  const {
    nickname,
    nicknameError,
    onNicknameChange,
    serverNicknameError,
    isNicknameValid,
    handleCheckNickname,
  } = useNickname(user.nickname);

  const {
    currentPassword,
    currentPasswordError,
    serverCurrentPasswordError,
    onCurrentPasswordChange,
    setServerCurrentPasswordError,

    newPassword,
    newPasswordError,
    serverNewPasswordError,
    onNewPasswordChange,

    confirmPassword,
    confirmPasswordError,
    onConfirmPasswordChange,

    isPasswordValid,
  } = usePassword();

  const isFormValid = isNicknameValid || isPasswordValid;

  const handleSubmit = async () => {
    try {
      if (isPasswordValid) {
        try {
          await requestPasswordUpdate(currentPassword, newPassword);
          await requestLogout();
          localStorage.clear();

          alert('비밀번호가 변경되었습니다. 다시 로그인해주세요.');
          window.location.href = '/login';
          return;
        } catch (error: any) {
          setServerCurrentPasswordError('비밀번호 변경 중 오류가 발생했습니다');
          return;
        }
      }

      if (isNicknameValid) {
        await requestNicknameUpdate(nickname);
        const userInfoResponse = await requestUserInfo();

        setUser({ ...user, ...userInfoResponse });
        alert('닉네임이 변경되었습니다.');
        window.location.reload();
      }
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
    serverCurrentPasswordError,
    onCurrentPasswordChange,

    newPassword,
    newPasswordError,
    serverNewPasswordError,
    onNewPasswordChange,

    confirmPassword,
    confirmPasswordError,
    onConfirmPasswordChange,

    isFormValid,

    handleCheckNickname,
    handleSubmit,
    handleBack,
  };
}
