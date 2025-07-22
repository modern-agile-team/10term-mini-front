import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react'
import { Link } from "react-router-dom"

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const togglePw = () => setShowPw((prev) => !prev);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      alert("아이디와 비밀번호를 확인하세요.")
      return;
    }

    // console.log(`아이디: ${username}\n비밀번호: ${password}`);
  }

  return (
    <div className="max-w-[1190px] mx-auto px-2">  
    <form onSubmit={handleSubmit}>
      <div className="mx-auto w-[580px] font-pretendard">
        <div className="flex flex-col items-center mt-[100px] py-[80px] rounded-lg border-2 shadow-lg bg-white text-center">
          <a className="text-6xl text-site-green font-interblack" href="/">
            NAVER
          </a>
          <div className="flex relative mt-[40px] w-[460px]
                border-2
                rounded-lg
              bg-gray-100
                focus-within:border-site-green-50">
            <input
              id="username"
              type="text"
              maxLength={10}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder=" "
              className="
              peer
              px-[15px]
              pt-[10px]
              w-[402px]
              h-[60px]
              bg-transparent
              focus:outline-none" 
            />
            <label
              htmlFor="username"
              className="absolute left-[17px] top-[8px] text-xs text-gray-500 transition-all
                peer-placeholder-shown:top-[18px]
                peer-placeholder-shown:text-base
                peer-placeholder-shown:text-gray-400
                peer-focus:top-[8px]
                peer-focus:left-[17px]
                peer-focus:text-xs
                peer-focus:text-gray">
              아이디
            </label>
          </div>
          <div className="flex relative mt-[10px] border-2
              rounded-lg
              bg-gray-100
              focus-within:border-site-green-50">
            <input
              id="password"
              type={showPw ? "text" : "password"} 
              maxLength={30}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              className="
              peer
              px-[15px]
              pt-[10px]
              w-[402px]
              h-[60px]
              bg-transparent
              focus:outline-none" 
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
                peer-focus:text-gray">
              비밀번호
            </label>
            <button 
            type="button"
            onClick={togglePw}
            className="m-2 mr-[20px]">
              {showPw ? (
                <EyeIcon className="w-7 h-7 text-gray-400" />
              ) : (
                <EyeSlashIcon className="w-7 h-7 text-gray-400" />
              )}
            </button>
          </div>
          <button 
          type="submit"
          className="mt-[20px]
          px-[15px]
          py-[10px]
          w-[460px]
          h-[50px]
          rounded-lg
          bg-site-green 
          text-xl
          text-white">
            로그인
          </button>
          <hr className="mt-[20px] border w-[460px]" />
        </div>
        <div 
          className="my-[25px] 
            py-[40px] 
            shadow-lg
            rounded-lg
            border-2
            bg-white 
            text-center
            text-xl
            font-[325]">
          계정이 없으신가요? &nbsp;
          
          <Link to="/signup" className="text-site-green text-2xl">
          가입하기
          </Link>
        </div>
      </div>
      </form>
    </div>
  );
}

export default Login;