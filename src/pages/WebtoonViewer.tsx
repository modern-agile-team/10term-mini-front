import WebtoonViewerHeader from '@/components/WebtoonViewerHeader';

export default function WebtoonViewer() {
  return (
    <div className="">
      <WebtoonViewerHeader
        webtoonTitle="웹툰 이름"
        episodeNo={123}
        episodeTitle="테스트 에피소드 제목"
      />
      <div className="w-[1190px] mx-auto mt-10 justify-center items-center flex">
        <img src="https://i.ibb.co/Kzb11gWP/1-1.webp" />
      </div>
    </div>
  );
}
