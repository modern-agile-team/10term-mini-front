import WebtoonFeedback from '@/components/WebtoonFeedback';
import WebtoonViewerHeader from '@/components/WebtoonViewerHeader';
import ScrollController from '@/components/ScrollController';
import { useRef } from 'react';

export default function WebtoonViewer() {
  const feedbackRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <ScrollController targetRef={feedbackRef} />
      <div className="flex flex-col items-center justify-center">
        <WebtoonViewerHeader
          webtoonTitle="웹툰 이름"
          episodeNo={123}
          episodeTitle="테스트 에피소드 제목"
        />
        <div className="w-[1190px] mx-auto mt-10 justify-center items-center flex">
          <img src="https://i.ibb.co/Kzb11gWP/1-1.webp" />
        </div>
        <div ref={feedbackRef}>
          <WebtoonFeedback likeCount={9727} ratingAvg={9.94} ratingCount={9751} />
        </div>
      </div>

      <div>{/* 댓글창, 광고창 */}</div>
    </>
  );
}
