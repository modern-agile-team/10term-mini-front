function Footer() {
  return (
    <>
      <footer className="w-[1190px] mx-auto">
        <div className="h-15 mt-[30px] pb-[10px] border-b flex items-center justify-between text-[17px] font-pretendard font-semibold">
          <a href="/">웹툰</a>
          <a href="#">웹툰 고객센터</a>
        </div>
        <div className="flex font-pretendard text-[12px]/6 text-gray-700 mt-[30px]">
          <div className="border-r w-[616px]">
            <ul className="list-none flex flex-wrap">
              <li>
                <a className="border-r pr-2" href="#">
                  인덕툰 이용약관
                </a>
              </li>
              <li>
                <a className="border-r px-2" href="#">
                  전용상품권 이용약관
                </a>
              </li>
              <li>
                <a className="border-r px-2" href="#">
                  개인정보처리방침
                </a>
              </li>
              <li>
                <a className="border-r px-2" href="#">
                  청소년보호정책
                </a>
              </li>
              <li>
                <a className="px-2" href="#">
                  게시물 및 커뮤니티 가이드라인
                </a>
              </li>
              <li>
                <a className="border-r pr-2" href="#">
                  웹툰 고객센터
                </a>
              </li>
              <li>
                <a className="border-r px-2" href="#">
                  광고 문의
                </a>
              </li>
              <li>
                <a className="border-r px-2" href="#">
                  사업 문의
                </a>
              </li>
              <li className="w-full font-inter">
                <p>&copy; Modern Agile 10term.</p>
              </li>
            </ul>
          </div>
          <div className="w-[574px] pl-[21px]">
            <a className="border-r pr-2" href="#">
              이용약관
            </a>
            <a className="border-r px-2" href="#">
              개인정보처리방침
            </a>
            <a className="border-r px-2" href="#">
              책임의 한계와 법적고지
            </a>
            <a className="border-r px-2" href="#">
              고객센터
            </a>
            <a className="border-r px-2" href="#">
              결제도용신고
            </a>
            <a className="pr-2" href="#">
              저작권침해신고
            </a>
            <p className="w-full">&copy; Modern Agile 10term.</p>
          </div>
        </div>
        <div className="text-gray-700 text-[12px]/6 mt-[30px] leading-relaxed">
          <p>
            인덕툰 대표이사 박인덕 | 사업자등록번호 000-00-00000 | 통신판매업 신고번호
            0000-서울노원0-0000 (뻥이에용)
          </p>
          <p>
            주소 서울특별시 노원구 초안산로 12 | 고객센터 02-950-7000 | 이메일 induktoon@example.com
          </p>
        </div>

        <div className="text-gray-700 text-[12px]/6 mt-[30px]">
          <p>
            이 사이트는 인덕대학교 소프트웨어 개발 동아리 모던 애자일 10기의 미니 프로젝트로 제작된
            가상의 서비스입니다. 실제 기업 또는 서비스와 무관하며 절대 불법을 조장하지 않습니다.
            진짜로요
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
