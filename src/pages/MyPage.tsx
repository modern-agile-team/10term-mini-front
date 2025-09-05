import { useMyPage } from '@/hooks';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { Navigate } from 'react-router';

function MyPage() {
  const isLoggedIn = Boolean(localStorage.getItem('user'));

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const {
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

    isFormValid,

    handleCheckNickname,
    handleSubmit,
    handleBack,
  } = useMyPage();

  return (
    <div className="w-[1190px] mx-auto m-20">
      <div>
        <p className="mr-4 py-1 text-3xl font-semibold">프로필 수정</p>
        <p className="mr-4 py-1 text-gray-400">네이버 별명과 비밀번호를 수정하실 수 있습니다.</p>
      </div>
      <div className="flex flex-col items-start w-full mt-5 border-t border-b">
        <div className="flex">
          <div className="bg-gray-100 w-[175px] h-[120px] p-5">별명</div>
          <div className="flex flex-col mx-6 mt-8">
            <div
              className={`flex relative border-[1.2px] rounded-md w-[310px] h-[45px]
                ${
                  nicknameError || serverNicknameError
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
                onChange={onNicknameChange}
                className="peer px-[15px] w-[310px] h-[45px] bg-transparent focus:outline-none"
                autoComplete="off"
              />
            </div>
            {(nicknameError || serverNicknameError) && (
              <div className="mt-2 left-[310px] bottom-[490px] w-full text-left text-red-600 text-xs">
                - {serverNicknameError || nicknameError}
              </div>
            )}
            {!nicknameError && !serverNicknameError && isNicknameValid && (
              <div className="mt-2 left-[310px] bottom-[490px] w-full text-left text-green-500 text-xs">
                - 사용 가능한 닉네임입니다.
              </div>
            )}
          </div>

          <button
            onClick={handleCheckNickname}
            className="mt-8 px-2 py-2 text-sm text-gray-500 rounded-md border-2 h-[45px]"
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
                currentPasswordError || serverCurrentPasswordError
                  ? 'border-site-red'
                  : 'border-input-border focus-within:border-site-green'
              }`}
          >
            <input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={onCurrentPasswordChange}
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
          {(currentPasswordError || serverCurrentPasswordError) && (
            <div className="mx-7 my-2 text-left text-red-600 text-xs">
              - {serverCurrentPasswordError || currentPasswordError}
            </div>
          )}
          <div
            className={`flex mx-6 my-3 relative border-[1.2px] rounded-md w-[402px] h-[60px]
              ${
                newPasswordError || serverNewPasswordError
                  ? 'border-site-red'
                  : 'border-input-border focus-within:border-site-green'
              }`}
          >
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={onNewPasswordChange}
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
              {!newPassword ? (
                <CheckCircleIcon className="w-8 h-8 text-gray-400 transition duration-200" />
              ) : newPasswordError || serverNewPasswordError ? (
                <XCircleIcon className="w-8 h-8 text-red-500 transition duration-200" />
              ) : (
                <CheckCircleIcon className="w-8 h-8 text-site-green transition duration-200" />
              )}
            </div>
          </div>
          {(newPasswordError || serverNewPasswordError) && (
            <div className="mx-7 my-2 text-left text-red-600 text-xs">
              - {serverNewPasswordError || newPasswordError}
            </div>
          )}
          <div
            className={`flex mx-6 mt-2 my-4 relative border-[1.2px] rounded-md w-[402px] h-[60px]
              ${
                confirmPasswordError
                  ? 'border-site-red'
                  : 'border-input-border focus-within:border-site-green'
              }`}
          >
            <input
              id="confirmNewPassword"
              type="password"
              value={confirmPassword}
              onChange={onConfirmPasswordChange}
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
              {!confirmPassword ? (
                <CheckCircleIcon className="w-8 h-8 text-gray-400 transition duration-200" />
              ) : confirmPasswordError ? (
                <XCircleIcon className="w-8 h-8 text-red-500 transition duration-200" />
              ) : (
                <CheckCircleIcon className="w-8 h-8 text-site-green transition duration-200" />
              )}
            </div>
          </div>
          {confirmPasswordError && (
            <div className="mx-7 my-4 text-left text-red-600 text-xs">
              - 비밀번호가 일치하지 않습니다
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
