function Footer() {
  return (
    <>
      <footer>
        <div className="h-15 mt-[30px] pb-[10px] border-b flex items-center justify-between text-[17px] font-pretendard font-semibold">
          {/* footerLink */}
          <a href="/">웹툰</a>
          <a href="/customer">웹툰 고객센터</a>
        </div>
        <div className="flex font-pretendard text-[12px]/6 text-gray-700 mt-[30px]">
          <div className="border-r w-[616px]">
            <ul className="list-none flex flex-wrap">
              <li><a className="border-r pr-2" href="#">네이버웹툰 이용약관</a></li>
              <li><a className="border-r px-2" href="#">전용상품권 이용약관</a></li>
              <li><a className="border-r px-2" href="#">개인정보처리방침</a></li>
              <li><a className="border-r px-2" href="#">청소년보호정책</a></li>
              <li><a className="px-2" href="#">게시물 및 커뮤니티 가이드라인</a></li>
              <li><a className="border-r pr-2" href="#">웹툰 고객센터</a></li>
              <li><a className="border-r px-2" href="#">광고 문의</a></li>
              <li><a className="border-r px-2" href="#">사업 문의</a></li>
              <li className="w-full font-inter"><p>&copy; NAVER WEBTOON Limited.</p></li>
            </ul>
          </div>
          <div className="w-[574px] pl-[21px]">
            <a className="border-r pr-2" href="#">이용약관</a>
            <a className="border-r px-2" href="#">개인정보처리방침</a>
            <a className="border-r px-2" href="#">책임의 한계와 법적고지</a>
            <a className="border-r px-2" href="#">고객센터</a>
            <a className="border-r px-2" href="#">결제도용신고</a>
            <a className="pr-2" href="#">저작권침해신고</a>
            <p className="w-full">&copy; NAVER CORP.</p>
          </div>
        </div>
        {/* 회사 정보 */}
        <div className="text-gray-700 text-[12px]/6 mt-[30px] leading-relaxed">
          <p>
            네이버웹툰(유) 대표이사 김준구 | 사업자등록번호 669-86-01888 | 통신판매업 신고번호 2020-성남분당B-0719 (사업자정보확인)
          </p>
          <p>
            주소 경기도 성남시 분당구 불정로 6 그린팩토리, 6-10층 | 고객센터 1588-3820 | 이메일 ccnaver@naver.com | 호스팅 서비스 제공 NAVER Cloud
          </p>
        </div>

        {/* 저작권 안내 */}
        <div className="text-gray-700 text-[12px]/6 mt-[30px]">
          <p>
            모든 콘텐츠의 저작권은 저작권자 또는 제공자에 있으며, 이를 무단으로 이용하는 경우 관련 법령에 따라 법적 책임을 질 수 있습니다.
          </p>
        </div>
        
      </footer>
    </>
  );
}

export default Footer