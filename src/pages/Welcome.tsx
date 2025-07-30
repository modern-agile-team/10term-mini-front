import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();
  const nickname = JSON.parse(localStorage.getItem("user") || "{}").nickname;
  
  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="max-w-[1190px] mx-auto px-2">
      <div className="mx-auto w-[580px] font-pretendard">
        <div className="flex flex-col items-center mt-[100px] pt-[80px] pb-[60px] rounded-lg border-2 shadow-lg bg-white text-center">
          <a className="text-4xl text-site-green font-interblack" href="/">
            NAVER
          </a>
          <div className="mt-[50px] mb-[30px]">
            <img src="/welcome.png"></img>
          </div>
          <div className="font-[400] text-[23px]/8">
            <span className="text-site-green">
              {nickname}
            </span> 님<br /> 환영합니다!
          </div>
          <button 
          onClick={handleGoHome}
          className="mt-[60px]
          px-[15px]
          py-[10px]
          w-[260px]
          h-[60px]
          rounded-sm
          bg-site-green 
          font-semibold
          text-xl
          text-white">
            홈 화면으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
