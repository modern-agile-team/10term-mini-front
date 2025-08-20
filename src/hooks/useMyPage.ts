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
    serverError: serverNicknameError,
    isValid: isNicknameValid,
    handleCheck: handleCheckNickname,
  } = useNickname(user.nickname);

  const {
    current: currentPassword,
    currentError: currentPasswordError,
    onCurrentChange: onCurrentPasswordChange,
    serverCurrentError: serverCurrentPasswordError,
    new: newPassword,
    newError: newPasswordError,
    onNewChange: onNewPasswordChange,
    serverNewError: serverNewPasswordError,
    confirm: confirmPassword,
    confirmError: confirmPasswordError,
    onConfirmChange: onConfirmPasswordChange,
    isValid: isPasswordValid,
  } = usePassword();

  const isFormValid = isNicknameValid || isPasswordValid;

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
