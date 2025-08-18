import useLocalStorage from '@/hooks/useLocalStorage';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import type { User } from '@/types/auth';
import { useEffect, useMemo, useState } from 'react';
import { instance } from '@/apis/axios';
import { useNavigate } from 'react-router';
import {
  requestNicknameCheck,
  requestNicknameUpdate,
  requestPasswordUpdate,
  requestUserInfo,
} from '@/apis/myPage';
import { requestLogout } from '@/apis/auth';

function MyPage() {
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

  const nicknameRegex = /^[가-힣a-zA-Z0-9]+$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,20}$/;

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
    if (currentPassword.trim() === '') {
      return '현재 비밀번호를 입력해주세요.';
    }
    return null;
  }, [currentPassword, isCurrentPasswordTouched]);

  const newPasswordError = useMemo(() => {
    if (serverNewPasswordError) return serverNewPasswordError;

    if (!isNewPasswordTouched) return null;
    if (newPassword.trim() === '') {
      return '새 비밀번호를 입력해주세요.';
    }
    if (!passwordRegex.test(newPassword)) {
      return '비밀번호는 8~20자이며, 영문자, 숫자, 특수문자를 각각 1자 이상 포함해야 합니다.';
    }
    return null;
  }, [newPassword, isNewPasswordTouched]);

  const confirmNewPasswordError = useMemo(() => {
    if (!isConfirmNewPasswordTouched) return null;
    if (confirmNewPassword.trim() === '') {
      return '비밀번호 확인을 입력해주세요.';
    }
    if (newPassword !== confirmNewPassword) {
      return '비밀번호가 일치하지 않습니다.';
    }
    return null;
  }, [newPassword, confirmNewPassword, isConfirmNewPasswordTouched]);

  const handleCheckNickname = async () => {
    try {
      const response = await requestNicknameCheck(nickname);
      const isAvailable = response.data.data.content.isAvailable;

      if (isAvailable) {
        setServerNicknameError(null);
        setIsNicknameValid(true);
      } else {
        setServerNicknameError('이미 사용 중인 닉네임입니다.');
        setIsNicknameValid(false);
      }
    } catch (err) {
      setIsNicknameValid(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (isNicknameValid) {
        await requestNicknameUpdate(nickname);

        const userInfoResponse = await requestUserInfo();
        const updatedNickname = userInfoResponse.data.data.content;

        setUser({
          ...user,
          ...updatedNickname,
        });
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
    if (window.history.length > 2) {
      window.history.back();
    } else {
      navigate('/');
    }
  };

  const isPasswordValid =
    newPassword && confirmNewPassword && !newPasswordError && !confirmNewPasswordError;

  const isFormValid = isNicknameValid || isPasswordValid;

  return (
    <div className="m-20">
      <div>
        <p className="mr-4 py-1 text-3xl font-semibold">프로필 수정</p>
        <p className="mr-4 py-1 text-gray-400">네이버 별명과 비밀번호를 수정하실 수 있습니다.</p>
      </div>
      <div className="flex flex-col items-start w-full mt-5 border-t border-b">
        <div className="flex items-center">
          <div className="bg-gray-100 w-[175px] h-[120px] p-5">별명</div>
          <div className="flex flex-col mx-6 my-5">
            <div
              className={`flex relative border-[1.2px] rounded-md w-[310px] h-[45px]
                ${
                  nicknameError
                    ? 'border-red-500'
                    : isNicknameValid
                      ? 'border-site-green'
                      : 'border-input-border focus-within:border-site-green'
                }`}
            >
              <input
                id="nickname"
                type="text"
                maxLength={30}
                value={nickname}
                placeholder="닉네임"
                onChange={(e) => setNickname(e.target.value)}
                onBlur={() => setNicknameTouched(true)}
                className="peer px-[15px] w-[310px] h-[45px] bg-transparent focus:outline-none"
                autoComplete="off"
              />
            </div>
            {nicknameError ? (
              <div className="absolute left-[310px] bottom-[490px] w-full text-left text-red-600 text-xs">
                - {nicknameError}
              </div>
            ) : isNicknameValid ? (
              <div className="absolute left-[310px] bottom-[490px] w-full text-left text-green-500 text-xs">
                - 사용 가능한 닉네임입니다.
              </div>
            ) : null}
          </div>

          <button
            onClick={handleCheckNickname}
            className="my-5 px-2 py-2 text-sm text-gray-500 rounded-md border-2 h-[45px]"
          >
            중복확인
          </button>
        </div>
      </div>
      <div className="flex border-t border-b">
        <div className="bg-gray-100 w-[175px] p-5">비밀번호 변경</div>
        <div className="py-3">
          <div
            className={`flex mx-6 mt-3 mb-2 relative border-[1.2px] rounded-md w-[402px] h-[60px]
              ${
                currentPasswordError
                  ? 'border-site-red'
                  : 'border-input-border focus-within:border-site-green'
              }`}
          >
            <input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              onBlur={() => setCurrentPasswordTouched(true)}
              maxLength={30}
              placeholder=" "
              className="peer px-[15px] pt-[10px] w-[402px] h-[60px] bg-transparent focus:outline-none"
              autoComplete="off"
            />
            <label
              htmlFor="currentPassword"
              className="absolute left-[15px] top-[8px] text-xs text-gray-500 transition-all
              peer-placeholder-shown:top-[18px]
              peer-placeholder-shown:text-base
              peer-placeholder-shown:text-gray-400
              peer-focus:top-[8px]
              peer-focus:left-[15px]
              peer-focus:text-xs
              peer-focus:text-gray"
            >
              현재 비밀번호
            </label>
          </div>
          {currentPasswordError && (
            <div className="mx-7 my-2 text-left text-red-600 text-xs">- {currentPasswordError}</div>
          )}
          <div
            className={`flex mx-6 my-3 relative border-[1.2px] rounded-md w-[402px] h-[60px]
              ${
                newPasswordError
                  ? 'border-site-red'
                  : 'border-input-border focus-within:border-site-green'
              }`}
          >
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              onBlur={() => setNewPasswordTouched(true)}
              maxLength={30}
              placeholder=" "
              className="peer px-[15px] pt-[10px] w-[402px] h-[60px] bg-transparent focus:outline-none"
              autoComplete="off"
            />
            <label
              htmlFor="newPassword"
              className="absolute left-[15px] top-[8px] text-xs text-gray-500 transition-all
              peer-placeholder-shown:top-[18px]
              peer-placeholder-shown:text-base
              peer-placeholder-shown:text-gray-400
              peer-focus:top-[8px]
              peer-focus:left-[15px]
              peer-focus:text-xs
              peer-focus:text-gray"
            >
              새 비밀번호
            </label>
            <div className="m-2 mt-[13px] mr-[10px]">
              {!isNewPasswordTouched ? (
                <CheckCircleIcon className="w-8 h-8 text-gray-400 transition duration-200" />
              ) : newPasswordError ? (
                <XCircleIcon className="w-8 h-8 text-red-500 transition duration-200" />
              ) : (
                <CheckCircleIcon className="w-8 h-8 text-site-green transition duration-200" />
              )}
            </div>
          </div>
          {newPasswordError && (
            <div className="mx-7 my-2 text-left text-red-600 text-xs">- {newPasswordError}</div>
          )}
          <div
            className={`flex mx-6 mt-2 my-4 relative border-[1.2px] rounded-md w-[402px] h-[60px]
              ${
                confirmNewPasswordError
                  ? 'border-site-red'
                  : 'border-input-border focus-within:border-site-green'
              }`}
          >
            <input
              id="confirmNewPassword"
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              onBlur={() => setConfirmNewPasswordTouched(true)}
              maxLength={30}
              placeholder=" "
              className="peer px-[15px] pt-[10px] w-[402px] h-[60px] bg-transparent focus:outline-none"
              autoComplete="off"
            />
            <label
              htmlFor="confirmNewPassword"
              className="absolute left-[15px] top-[8px] text-xs text-gray-500 transition-all
              peer-placeholder-shown:top-[18px]
              peer-placeholder-shown:text-base
              peer-placeholder-shown:text-gray-400
              peer-focus:top-[8px]
              peer-focus:left-[15px]
              peer-focus:text-xs
              peer-focus:text-gray"
            >
              비밀번호 확인
            </label>
            <div className="m-2 mt-[13px] mr-[10px]">
              {!isConfirmNewPasswordTouched ? (
                <CheckCircleIcon className="w-8 h-8 text-gray-400 transition duration-200" />
              ) : confirmNewPasswordError ? (
                <XCircleIcon className="w-8 h-8 text-red-500 transition duration-200" />
              ) : (
                <CheckCircleIcon className="w-8 h-8 text-site-green transition duration-200" />
              )}
            </div>
          </div>
          {confirmNewPasswordError && (
            <div className="mx-7 my-4 text-left text-red-600 text-xs">
              - {confirmNewPasswordError}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center gap-x-2 mt-5">
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`px-5 py-2 border-[1.4px] rounded-md ${
            isFormValid ? 'text-gray-800 border-gray-400' : 'text-gray-300 border-gray-200'
          }`}
        >
          적용
        </button>
        <button
          onClick={() => handleBack()}
          className="px-5 py-2 border-[1.4px] border-gray-400 rounded-md"
        >
          돌아가기
        </button>
      </div>
    </div>
  );
}

export default MyPage;
