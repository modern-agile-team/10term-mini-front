import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import type { User, SignupRequest, SignupResponse } from '@/types/auth';
import { requestSignup } from '@/apis/auth';
import useLocalStorage from '@/hooks/useLocalStorage';
import { nicknameRegex, passwordRegex, usernameRegex } from '@/constants/regex.constants';

function useSignup() {
  const navigate = useNavigate();

  const [, setUser] = useLocalStorage<User | null>('user', null);
  const [, setAccessToken] = useLocalStorage<string | null>('accessToken', null);

  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  const [isUsernameTouched, setUsernameTouched] = useState(false);
  const [isNicknameTouched, setNicknameTouched] = useState(false);
  const [isPasswordTouched, setPasswordTouched] = useState(false);
  const [isConfirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  const [serverUsernameError, setServerUsernameError] = useState<string | null>(null);
  const [serverNicknameError, setServerNicknameError] = useState<string | null>(null);

  useEffect(() => {
    setServerUsernameError(null);
  }, [username]);
  useEffect(() => {
    setServerNicknameError(null);
  }, [nickname]);

  const usernameError = useMemo(() => {
    if (serverUsernameError) return serverUsernameError;
    if (!isUsernameTouched) return null;
    if (username.trim() === '') return '아이디를 입력해주세요.';
    if (!usernameRegex.test(username)) {
      return '아이디는 5~20자 이내의 영어 소문자(a-z), 숫자(0-9), 특수문자(_, -)로 구성되어야 합니다.';
    }
    return null;
  }, [username, isUsernameTouched, serverUsernameError]);

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

  const passwordError = useMemo(() => {
    if (!isPasswordTouched) return null;
    if (password.trim() === '') return '비밀번호를 입력해주세요.';
    if (!passwordRegex.test(password)) {
      return '비밀번호는 8~20자이며, 영문자, 숫자, 특수문자를 각각 1자 이상 포함해야 합니다.';
    }
    return null;
  }, [password, isPasswordTouched]);

  const confirmPasswordError = useMemo(() => {
    if (!isConfirmPasswordTouched) return null;
    if (confirmPassword.trim() === '') return '비밀번호 확인을 입력해주세요.';
    if (!passwordRegex.test(confirmPassword)) {
      return '비밀번호를 확인해주세요.';
    }
    if (confirmPassword !== password) {
      return '비밀번호가 일치하지 않습니다.';
    }
    return null;
  }, [confirmPassword, password, isConfirmPasswordTouched]);

  const isFormValid =
    username &&
    nickname &&
    password &&
    confirmPassword &&
    !usernameError &&
    !nicknameError &&
    !passwordError &&
    !confirmPasswordError;

  const togglePw = () => setShowPw((prev) => !prev);
  const toggleConfirmPw = () => setShowConfirmPw((prev) => !prev);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) {
      alert('유효하지 않은 입력이 있습니다.');
      return;
    }

    const signupData: SignupRequest = { username, nickname, password };

    setServerUsernameError(null);
    setServerNicknameError(null);
    signup(signupData);
  };

  const signup = async (signupData: SignupRequest): Promise<void> => {
    try {
      const data = await requestSignup(signupData);

      if (data.success) {
        setAccessToken(data.data.content.accessToken);
        setUser(data.data.content.user);

        navigate('/welcome');
      }
    } catch (error: any) {
      if (error.response?.status === 409) {
        const data = error.response.data as SignupResponse;

        if ('field' in data.data) {
          const field = data.data.field;

          if (field.includes('username')) {
            setServerUsernameError('이미 있는 아이디입니다.');
          }

          if (field.includes('nickname')) {
            setServerNicknameError('이미 있는 닉네임입니다.');
          }

          return;
        }
      }

      if (error.response?.status === 400) {
        alert('유효하지 않은 요청');
      }

      console.error('회원가입 실패...', error);
    }
  };

  return {
    username,
    setUsername,
    nickname,
    setNickname,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,

    isUsernameTouched,
    setUsernameTouched,
    isNicknameTouched,
    setNicknameTouched,
    isPasswordTouched,
    setPasswordTouched,
    isConfirmPasswordTouched,
    setConfirmPasswordTouched,

    usernameError,
    nicknameError,
    passwordError,
    confirmPasswordError,

    showPw,
    showConfirmPw,
    togglePw,
    toggleConfirmPw,

    handleSubmit,

    isFormValid,
  };
}

export default useSignup;
