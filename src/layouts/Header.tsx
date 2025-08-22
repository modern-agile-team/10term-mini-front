import naver from '/naver.svg';
import n from '/n.svg';
import { XCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { requestLogout } from '@/apis/auth';
import { useState } from 'react';
import { Link, NavLink, useSearchParams, useLocation, useNavigate } from 'react-router';
import { DAY_MAPPING, UI_DAYS } from '@/constants/date.constants';
interface HeaderProps {
  user: {
    username: string;
    nickname: string;
  } | null;
}

function Header({ user }: HeaderProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await requestLogout();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    window.location.reload();
  };

  const [inputValue, setInputValue] = useState('');
  const handleInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedDay = searchParams.get('day');

  const EXCLUDED_PATHS = ['/favorites', '/mypage'];
  const location = useLocation();

  return (
    <header className="">
      <div className="h-15 flex items-center justify-between">
        {/* HeaderTop */}
        <h1 className="flex">
          <Link to="/" className="font-interblack text-lg">
            <img src={naver} className="h-[30px]"></img>
          </Link>
          <Link to="/" className="font-semibold text-2xl ml-[5px]">
            웹툰
          </Link>
        </h1>
        <div className="flex items-center justify-between">
          <div
            className="flex items-center border my-[14px] mr-[18px] gap-x-2
          group focus-within:outline focus-within:outline-2 focus-within:outline-blue-500 rounded-sm"
          >
            <input
              type="text"
              value={inputValue}
              onChange={handleInputValue}
              placeholder="제목/작가로 검색할 수 있습니다."
              maxLength={18}
              className="w-60 pl-3 h-9 text-base
            focus:outline-none"
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
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">{user.nickname}님</span>
              <button
                onClick={handleLogout}
                className="border border-gray-300 text-sm text-gray-500 px-[6px] py-[2px] rounded"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <button className="border border-gray-300 text-sm text-gray-500 px-[6px] py-[2px] rounded">
              <Link to="/login">로그인</Link>
            </button>
          )}
        </div>
      </div>
      <hr />
      <div className="h-15 flex items-center justify-between">
        {/* HeaderNav */}
        <nav>
          <ul className="flex text-[17px] font-pretendard font-normal">
            <li className="leading-[24px]">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-5 py-4 leading-[24px] block ${
                    isActive ||
                    (location.pathname !== '/favorites' && location.pathname !== '/mypage')
                      ? 'bg-site-red text-white'
                      : ''
                  }`
                }
              >
                웹툰
              </NavLink>
            </li>
            <li className="leading-[24px]">
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  `px-5 py-4 leading-[24px] block ${isActive ? 'bg-site-red text-white' : ''}`
                }
              >
                관심목록
              </NavLink>
            </li>
            <li className="leading-[24px]">
              <NavLink
                to="/mypage"
                className={({ isActive }) =>
                  `px-5 py-4 leading-[24px] block ${isActive ? 'bg-site-red text-white' : ''}`
                }
              >
                마이페이지
              </NavLink>
            </li>
          </ul>
        </nav>
        <div>
          <button
            onClick={() => {
              const randomId = Math.floor(Math.random() * 32) + 1;
              navigate(`/webtoon/${randomId}`);
            }}
            className="flex items-center font-inter bg-site-red text-white text-sm px-10 h-10 rounded"
          >
            RANDOM
            <img src={n} className="absolute ml-[80px] mb-[15px]" />
          </button>
        </div>
      </div>
      <hr />
      {!EXCLUDED_PATHS.includes(location.pathname) && (
        <>
          <div className="h-12 flex items-center justify-between">
            {/* HeaderDay */}
            <nav>
              <ul className="flex gap-6 text-[15px] font-pretendard font-semibold">
                <li>
                  <button
                    type="button"
                    className={`px-1 py-3 border-b-2 ${
                      !selectedDay ? 'text-site-red border-site-red' : 'border-transparent'
                    }`}
                    onClick={() => navigate('/')}
                  >
                    요일전체
                  </button>
                </li>
                {UI_DAYS.map((day) => {
                  return (
                    <li key={day}>
                      <button
                        type="button"
                        className={`py-3 w-6 ${
                          selectedDay === day ? 'border-b-2 border-site-red text-site-red' : ''
                        }`}
                        onClick={() => {
                          navigate('/?day=' + day);
                        }}
                      >
                        {DAY_MAPPING[day].replace('요웹툰', '')}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
          <hr />
        </>
      )}
    </header>
  );
}

export default Header;
