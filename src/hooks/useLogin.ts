import { useState } from 'react';
import { useNavigate } from 'react-router';
import { requestLogin } from '../apis/auth';
import type { User, LoginRequest } from '../types/auth';
import useLocalStorage from './useLocalStorage';

function useLogin() {
  const navigate = useNavigate();

  const [, setUser] = useLocalStorage<User | null>('user', null);
  const [, setAccessToken] = useLocalStorage<string | null>('accessToken', null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const togglePw = () => setShowPw((prev) => !prev);

  const login = async (loginData: LoginRequest): Promise<void> => {
    try {
      const data = await requestLogin(loginData);
      if (data.success) {
        setAccessToken(data.data.content.accessToken);
        setUser(data.data.content.user);
        navigate('/');
      }
    } catch {
      setErrorMsg('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      alert('아이디와 비밀번호를 확인하세요.');
      return;
    }

    setErrorMsg(null);
    login({ username, password });
  };

  return {
    username,
    password,
    showPw,
    errorMsg,
    setUsername,
    setPassword,
    togglePw,
    handleSubmit,
  };
}

export default useLogin;
