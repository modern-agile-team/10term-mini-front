import { useRef, useState } from 'react';
import WebtoonFeedback from '@/components/WebtoonFeedback';
import WebtoonViewerHeader from '@/components/WebtoonViewerHeader';
import ScrollController from '@/components/ScrollController';
import Spinner from '@/assets/spinner.svg';
import episode from '@/assets/epsiode.webp';

export default function WebtoonViewer() {
  const feedbackRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

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
          {isLoading && (
            <div className="flex justify-center items-center py-10">
              <img src={Spinner} alt="로딩 중" className="animate-spin h-8 w-8" />
            </div>
          )}
          <img
            src={episode}
            alt="웹툰 이미지"
            onLoad={handleLoad}
            className={isLoading ? 'hidden' : 'block'}
          />
        </div>
        <div ref={feedbackRef}>
          <WebtoonFeedback likeCount={9727} ratingAvg={9.94} ratingCount={9751} />
        </div>
      </div>

      <div>{/* 댓글창, 광고창 */}</div>
    </>
  );
}
