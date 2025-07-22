import { XCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Link } from 'react-router-dom'

function Header() {
  const [inputValue, setInputValue] = useState("");

  const handleInputValue = (event : React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

    return (
      <header >
        <div className="h-15 border-b flex items-center justify-between ">
          {/* HeaderTop */}
          <h1 className="">
            <a className="font-interblack text-lg" href="/">
              NAVER
            </a>
            <a className="font-bold text-2xl ml-[10px]" href="/">
              웹툰
            </a>
          </h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center border h-9 my-[14px] mr-[18px] gap-x-2">
              <input 
              type="text"
              value={inputValue}
              onChange={handleInputValue}
              placeholder="제목/작가로 검색할 수 있습니다." 
              maxLength={18}
              className="w-60 pl-3 text-base" 
              />
              <button
                onClick={() => setInputValue('')}
                className={inputValue ? '' : 'opacity-0 pointer-events-none'}
                >
                <XCircleIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
              </button>
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
              &nbsp;&nbsp;
            </div>
            <button className="border border-gray-300 text-sm text-gray-500 px-[6px]">
              <Link to="/login">로그인</Link>
            </button>
          </div>
        </div>
        <div className="h-15 border-b flex items-center justify-between">
          {/* HeaderNav */}
          <nav>
            <ul className="flex text-[17px] font-pretendard font-semibold">
              <li className="px-4 py-4"><a href="/">홈</a></li>
              <li className="px-4 py-4 bg-site-green text-white">웹툰</li>
              <li className="px-4 py-4">베스트도전</li>
              <li className="px-4 py-4">도전만화</li>
              <li className="px-4 py-4">마이페이지</li>
            </ul>
          </nav>
          <div>
            <button className="font-inter bg-site-green text-white text-sm px-8 h-10 rounded">CREATOR'S</button>
          </div>
        </div>
        <div className="h-14 border-b flex items-center justify-between ">
          {/* HeaderDay */}
          <nav>
            <ul className="flex gap-9 text-[17px] font-pretendard font-semibold">
                <li className="py-4 text-site-green border-b-2 border-site-green">
                  <a href="/">요일전체</a>
                </li>
                <li className="py-4">월</li>
                <li className="py-4">화</li>
                <li className="py-4">수</li>
                <li className="py-4">목</li>
                <li className="py-4">금</li>
                <li className="py-4">토</li>
                <li className="py-4">일</li>
                <li className="py-4">신작</li>
                <li className="py-4">완결</li>
              </ul>
          </nav>
        </div>
      </header>
    );
}

export default Header;