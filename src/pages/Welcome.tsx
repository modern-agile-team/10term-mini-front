import naver from '@/assets/naver.svg';
import logo from '@/assets/logo.svg';
import { Link, useNavigate } from 'react-router';

function Welcome() {
  const navigate = useNavigate();
  const nickname = JSON.parse(localStorage.getItem('user') || '{}').nickname;

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="max-w-[1190px] mx-auto px-2">
      <div className="mx-auto w-[580px] font-pretendard">
        <div className="flex flex-col items-center mt-[100px] pt-[60px] pb-[80px] rounded-xl border-[1.2px] shadow-[0_0_30px_rgba(0,0,0,0.1)] bg-white text-center">
          <Link to="/" aria-label="네이버 홈" className="">
            <img src={naver} alt="NAVER" className="h-[64px] w-auto" />
          </Link>
          <div className="mt-[30px] mb-[20px]">
            <img src={logo}></img>
          </div>
          <div className="font-[400] text-[23px]/8">
            <span className="text-site-red font-semibold">{nickname}</span> 님<br /> 환영합니다!
          </div>
          <button
            onClick={handleGoHome}
            className="mt-[60px]
          px-[15px]
          py-[10px]
          w-[295px]
          h-[67px]
          rounded-md
          bg-site-red 
          font-semibold
          text-2xl
          text-white"
          >
            홈 화면으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
