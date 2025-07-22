import {
  XCircleIcon,
  CheckCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { useState, useMemo } from "react";

function Signup() {
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  const togglePw = () => setShowPw((prev) => !prev);
  const toggleConfirmPw = () => setShowConfirmPw((prev) => !prev);

  const [isUsernameTouched, setUsernameTouched] = useState(false);
  const [isNicknameTouched, setNicknameTouched] = useState(false);
  const [isPasswordTouched, setPasswordTouched] = useState(false);
  const [isConfirmTouched, setConfirmTouched] = useState(false);

  const usernameRegex = /^[a-z0-9_-]{5,20}$/;
  const nicknameRegex = /^[가-힣a-zA-Z0-9]+$/;
  const passwordRegex =
    /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,20}$/;

  const usernameError = useMemo(() => {
    if (!isUsernameTouched) return null; // 아직 입력 안 했으면 오류 없음
    if (username.trim() === "") return "아이디를 입력해주세요.";
    if (!usernameRegex.test(username)) {
      return "아이디는 5~20자 이내의 영어 소문자(a-z), 숫자(0-9), 특수문자(_, -)로 구성되어야 합니다.";
    }
    return null; // 유효
  }, [username, isUsernameTouched]);

  const nicknameError = useMemo(() => {
    if (!isNicknameTouched) return null;
    if (nickname.trim() === "") return "닉네임을 입력해주세요.";
    const hasHangul = /[가-힣]/.test(nickname);
    const maxLength = hasHangul ? 10 : 30;
    if (nickname.length > maxLength || !nicknameRegex.test(nickname)) {
      return "닉네임은 한글 10자, 영문/숫자 30자 이내로 구성되어야 합니다.";
    }
    return null;
  }, [nickname, isNicknameTouched]);

  const passwordError = useMemo(() => {
    if (!isPasswordTouched) return null;
    if (password.trim() === "") return "비밀번호를 입력해주세요.";
    if (!passwordRegex.test(password)) {
      return "비밀번호는 8~20자 이내의 영어 대/소문자, 숫자, 특수문자로 구성되어야 합니다.";
    }
    return null;
  }, [password, isPasswordTouched]);

  const confirmPasswordError = useMemo(() => {
    if (!isConfirmTouched) return null;
    if (!passwordRegex.test(confirmPassword)) {
      return "비밀번호를 확인해주세요.";
    }
    if (confirmPassword.trim() === "") return "비밀번호 확인을 입력해주세요.";
    if (confirmPassword !== password) {
      return "비밀번호가 일치하지 않습니다.";
    }
    return null;
  }, [confirmPassword, password, isConfirmTouched]);

  const isFormValid =
    !usernameError && !nicknameError && !passwordError && !confirmPasswordError;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      alert("유효하지 않은 입력이 있습니다.");
      return;
    }
    // console.log(s
    //   `아이디: ${username}\n비밀번호: ${password}\n닉네임: ${nickname}`
    // );
  };

  return (
    <div className="max-w-[1190px] mx-auto px-2">
      <form onSubmit={handleSubmit}>
        <div className="mx-auto w-[580px] font-pretendard">
          <div className="flex flex-col items-center mt-[100px] pt-[80px] pb-[25px] rounded-lg border-2 shadow-lg bg-white text-center">
            <a className="text-6xl text-site-green font-interblack" href="/">
              NAVER
            </a>
            <div
              className={`flex relative border-2 rounded-lg bg-gray-100 mt-[40px]
          ${
            usernameError
              ? "border-red-500"
              : "focus-within:border-site-green-50"
          }`}
            >
              <input
                id="username"
                type="text"
                maxLength={10}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={() => setUsernameTouched(true)}
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
              <span className="m-2 ml-[50px]">
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
                className="absolute left-[17px] top-[8px] text-xs text-gray-500 transition-all
                    peer-placeholder-shown:top-[18px]
                    peer-placeholder-shown:text-base
                    peer-placeholder-shown:text-gray-400
                    peer-focus:top-[8px]
                    peer-focus:left-[17px]
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
              className={`flex relative mt-[10px] 
                border-2
                rounded-lg
                bg-gray-100
                ${
                  nicknameError
                    ? "border-red-500"
                    : "focus-within:border-site-green-50"
                }`}
            >
              <input
                id="nickname"
                type="text"
                maxLength={10}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                onBlur={() => setNicknameTouched(true)}
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
                htmlFor="nickname"
                className="absolute left-[17px] top-[8px] text-xs text-gray-500 transition-all
                    peer-placeholder-shown:top-[18px]
                    peer-placeholder-shown:text-base
                    peer-placeholder-shown:text-gray-400
                    peer-focus:top-[8px]
                    peer-focus:left-[17px]
                    peer-focus:text-xs
                    peer-focus:text-gray"
              >
                닉네임
              </label>
              <span className="m-2 ml-[50px]">
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
              className={`flex relative mt-[10px] 
                border-2
                rounded-lg
                bg-gray-100
                ${
                  passwordError
                    ? "border-red-500"
                    : "focus-within:border-site-green-50"
                }`}
            >
              <input
                id="password"
                type={showPw ? "text" : "password"}
                maxLength={30}
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
                className="absolute left-[17px] top-[8px] text-xs text-gray-500 transition-all
                    peer-placeholder-shown:top-[18px]
                    peer-placeholder-shown:text-base
                    peer-placeholder-shown:text-gray-400
                    peer-focus:top-[8px]
                    peer-focus:left-[17px]
                    peer-focus:text-xs
                    peer-focus:text-gray"
              >
                비밀번호
              </label>
              <button type="button" onClick={togglePw} className="m-2">
                {showPw ? (
                  <EyeIcon className="w-7 h-7 text-gray-400" />
                ) : (
                  <EyeSlashIcon className="w-7 h-7 text-gray-400" />
                )}
              </button>
              <span className="m-2">
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
              className={`flex relative mt-[10px] 
                border-2
                rounded-lg
                bg-gray-100
                ${
                  confirmPasswordError
                    ? "border-red-500"
                    : "focus-within:border-site-green-50"
                }`}
            >
              <input
                id="confirmPassword"
                type={showConfirmPw ? "text" : "password"}
                maxLength={30}
                value={confirmPassword}
                onBlur={() => setConfirmTouched(true)}
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
                className="absolute left-[17px] top-[8px] text-xs text-gray-500 transition-all
                    peer-placeholder-shown:top-[18px]
                    peer-placeholder-shown:text-base
                    peer-placeholder-shown:text-gray-400
                    peer-focus:top-[8px]
                    peer-focus:left-[17px]
                    peer-focus:text-xs
                    peer-focus:text-gray"
              >
                비밀번호 확인
              </label>
              <button type="button" onClick={toggleConfirmPw} className="m-2">
                {showConfirmPw ? (
                  <EyeIcon className="w-7 h-7 text-gray-400" />
                ) : (
                  <EyeSlashIcon className="w-7 h-7 text-gray-400" />
                )}
              </button>
              <span className="m-2">
                {!isPasswordTouched ? (
                  <CheckCircleIcon className="w-[42px] h-10 text-gray-400" />
                ) : passwordError ? (
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
              disabled={!username && !password}
              className={`mt-[20px]
            px-[15px]
            py-[10px]
            w-[460px]
            h-[60px]
            rounded-lg
            ${
              username || password || nickname || confirmPassword
                ? "bg-site-green"
                : "bg-site-green-50"
            }
            text-xl
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
