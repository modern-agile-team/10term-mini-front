import { XCircleIcon, CheckCircleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import naver from '/naver.svg';
import { Link } from 'react-router';
import useSignup from '../hooks/useSignup';

function Signup() {
  const {
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
  } = useSignup();

  return (
    <div className="max-w-[1190px] mx-auto px-2">
      <form onSubmit={handleSubmit}>
        <div className="mx-auto w-[580px] font-pretendard">
          <div className="flex flex-col items-center mt-[100px] pt-[40px] pb-[20px] rounded-xl border-[1.2px] shadow-[0_0_30px_rgba(0,0,0,0.1)] bg-white text-center">
            <Link to="/" aria-label="네이버 홈" className="">
              <img src={naver} alt="NAVER" className="h-[86px] w-auto" />
            </Link>
            <div
              className={`flex relative items-center border-[1.2px] rounded-lg border-input-border bg-input-gray mt-[50px]
          ${usernameError ? 'border-red-500' : 'focus-within:border-site-green-50'}`}
            >
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={() => setUsernameTouched(true)}
                placeholder=" "
                className="
                peer
                px-[15px]
                pt-[10px]
                w-[396px]
                h-[60px]
                bg-transparent
                focus:outline-none"
                autoComplete="off"
              />
              <span
                className={`
                  m-2 w-11 h-10
                  inline-flex items-center justify-center
                  shrink-0
                  transition-opacity duration-150
                  ${username.length > 0 ? 'opacity-100' : 'opacity-0'}
                `}
              >
                {!isUsernameTouched ? (
                  <CheckCircleIcon className="w-11 h-10 text-gray-400" />
                ) : usernameError ? (
                  <XCircleIcon className="w-11 h-10 text-red-500" />
                ) : (
                  <CheckCircleIcon className="w-11 h-10 text-site-green" />
                )}
              </span>
              <label
                htmlFor="username"
                className="absolute left-[15px] top-[8px] text-xs text-gray-500 transition-all
                    peer-placeholder-shown:top-[18px]
                    peer-placeholder-shown:text-base
                    peer-placeholder-shown:text-gray-400
                    peer-focus:top-[8px]
                    peer-focus:left-[14px]
                    peer-focus:text-xs
                    peer-focus:text-gray"
              >
                아이디
              </label>
            </div>
            {usernameError && (
              <div className="mt-[10px] w-full pl-[65px] text-left text-red-600 text-xs">
                - {usernameError}
              </div>
            )}
            <div
              className={`flex relative items-center mt-[13px] 
                border-[1.2px] 
                rounded-lg 
                border-input-border
                bg-input-gray
                ${nicknameError ? 'border-red-500' : 'focus-within:border-site-green-50'}`}
            >
              <input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                onBlur={() => setNicknameTouched(true)}
                placeholder=" "
                className="
                peer
                px-[15px]
                pt-[10px]
                w-[396px]
                h-[60px]
                bg-transparent
                focus:outline-none"
                autoComplete="off"
              />
              <label
                htmlFor="nickname"
                className="absolute left-[15px] top-[8px] text-xs text-gray-500 transition-all
                    peer-placeholder-shown:top-[18px]
                    peer-placeholder-shown:text-base
                    peer-placeholder-shown:text-gray-400
                    peer-focus:top-[8px]
                    peer-focus:left-[14px]
                    peer-focus:text-xs
                    peer-focus:text-gray"
              >
                닉네임
              </label>
              <span
                className={`
                  m-2 w-11 h-10
                  inline-flex items-center justify-center
                  shrink-0
                  transition-opacity duration-150
                  ${nickname.length > 0 ? 'opacity-100' : 'opacity-0'}
                `}
              >
                {!isNicknameTouched ? (
                  <CheckCircleIcon className="w-11 h-10 text-gray-400" />
                ) : nicknameError ? (
                  <XCircleIcon className="w-11 h-10 text-red-500" />
                ) : (
                  <CheckCircleIcon className="w-11 h-10 text-site-green" />
                )}
              </span>
            </div>
            {nicknameError && (
              <div className="mt-[10px] w-full pl-[65px] text-left text-red-600 text-xs">
                - {nicknameError}
              </div>
            )}
            <div
              className={`flex relative items-center mt-[13px] 
                border-[1.2px] 
                rounded-lg 
                border-input-border
                bg-input-gray
                ${passwordError ? 'border-red-500' : 'focus-within:border-site-green-50'}`}
            >
              <input
                id="password"
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setPasswordTouched(true)}
                placeholder=" "
                className="
                peer
                px-[15px]
                pt-[10px]
                w-[354px]
                h-[60px]
                bg-transparent
                focus:outline-none"
                autoComplete="off"
              />
              <label
                htmlFor="password"
                className="absolute left-[15px] top-[8px] text-xs text-gray-500 transition-all
                    peer-placeholder-shown:top-[18px]
                    peer-placeholder-shown:text-base
                    peer-placeholder-shown:text-gray-400
                    peer-focus:top-[8px]
                    peer-focus:left-[14px]
                    peer-focus:text-xs
                    peer-focus:text-gray"
              >
                비밀번호
              </label>
              <button
                type="button"
                onClick={togglePw}
                className={`m-2 w-7 h-7 flex items-center justify-center transition-opacity duration-150
                ${password.length > 0 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
              >
                {showPw ? (
                  <EyeIcon className="w-7 h-7 text-gray-400" />
                ) : (
                  <EyeSlashIcon className="w-7 h-7 text-gray-400" />
                )}
              </button>
              <span
                className={`m-2 w-[42px] h-10 flex items-center justify-center transition-opacity duration-150
                ${password.length > 0 ? 'opacity-100' : 'opacity-0'} pointer-events-none`}
              >
                {!isPasswordTouched ? (
                  <CheckCircleIcon className="w-[42px] h-10 text-gray-400" />
                ) : passwordError ? (
                  <XCircleIcon className="w-[42px] h-10 text-red-500" />
                ) : (
                  <CheckCircleIcon className="w-[42px] h-10 text-site-green" />
                )}
              </span>
            </div>
            {passwordError && (
              <div className="mt-[10px] w-full pl-[65px] text-left text-red-600 text-xs">
                - {passwordError}
              </div>
            )}
            <div
              className={`flex relative items-center mt-[13px] 
                border-[1.2px] rounded-lg 
                border-input-border
                bg-input-gray
                ${confirmPasswordError ? 'border-red-500' : 'focus-within:border-site-green-50'}`}
            >
              <input
                id="confirmPassword"
                type={showConfirmPw ? 'text' : 'password'}
                value={confirmPassword}
                onBlur={() => setConfirmPasswordTouched(true)}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder=" "
                className="
                peer
                px-[15px]
                pt-[10px]
                w-[354px]
                h-[60px]
                bg-transparent
                focus:outline-none"
                autoComplete="off"
              />
              <label
                htmlFor="confirmPassword"
                className="absolute left-[15px] top-[8px] text-xs text-gray-500 transition-all
                    peer-placeholder-shown:top-[18px]
                    peer-placeholder-shown:text-base
                    peer-placeholder-shown:text-gray-400
                    peer-focus:top-[8px]
                    peer-focus:left-[14px]
                    peer-focus:text-xs
                    peer-focus:text-gray"
              >
                비밀번호 확인
              </label>
              <button
                type="button"
                onClick={toggleConfirmPw}
                className={`m-2 w-7 h-7 flex items-center justify-center transition-opacity duration-150
                ${confirmPassword.length > 0 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
              >
                {showConfirmPw ? (
                  <EyeIcon className="w-7 h-7 text-gray-400" />
                ) : (
                  <EyeSlashIcon className="w-7 h-7 text-gray-400" />
                )}
              </button>
              <span
                className={`m-2 w-[42px] h-10 flex items-center justify-center transition-opacity duration-150
                ${confirmPassword.length > 0 ? 'opacity-100' : 'opacity-0'} pointer-events-none`}
              >
                {!isConfirmPasswordTouched ? (
                  <CheckCircleIcon className="w-[42px] h-10 text-gray-400" />
                ) : confirmPasswordError ? (
                  <XCircleIcon className="w-[42px] h-10 text-red-500" />
                ) : (
                  <CheckCircleIcon className="w-[42px] h-10 text-site-green" />
                )}
              </span>
            </div>
            {confirmPasswordError && (
              <div className="mt-[10px] w-full pl-[65px] text-left text-red-600 text-xs">
                - {confirmPasswordError}
              </div>
            )}
            <button
              type="submit"
              disabled={!isFormValid}
              className={`mt-[15px]
            px-[15px]
            py-[10px]
            w-[460px]
            h-[80px]
            rounded-md
            ${isFormValid ? 'bg-site-red' : 'bg-site-red-50'}
            text-2xl
            font-bold
            text-white`}
            >
              가입
            </button>
            <hr className="mt-[20px] border w-[460px]" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
