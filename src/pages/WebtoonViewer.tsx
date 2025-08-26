import { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import WebtoonFeedback from '@/components/WebtoonFeedback';
import WebtoonViewerHeader from '@/components/WebtoonViewerHeader';
import ScrollController from '@/components/ScrollController';
import Spinner from '@/assets/spinner.svg';
import { increaseViewCount, requestWebtoonEpisode } from '@/apis/webtoonViewer';
import type { WebtoonViewerEpisode } from '@/types/webtoonViewer';

export default function WebtoonViewer() {
  const { episodeid } = useParams();
  const feedbackRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [episode, setEpisode] = useState<WebtoonViewerEpisode | null>(null);

  useEffect(() => {
    const fetchEpisode = async () => {
      if (!episodeid) return;
      try {
        const data = await requestWebtoonEpisode(Number(episodeid));
        await increaseViewCount(Number(episodeid));
        setEpisode(data);
      } catch (error) {
        console.error('에피소드 로딩 실패:', error);
      }
    };

    fetchEpisode();
  }, [episodeid]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (!episode) return <div>로딩 중...</div>;

  return (
    <>
      <ScrollController targetRef={feedbackRef} />
      <div className="flex flex-col items-center justify-center">
        <WebtoonViewerHeader
          webtoonTitle={episode.webtoonTitle}
          episodeNo={episode.episodeNo}
          episodeTitle={episode.episodeTitle}
        />
        <div className="w-[1190px] mx-auto mt-10 mb-20 justify-center items-center flex">
          {isLoading && (
            <div className="flex justify-center items-center py-10">
              <img src={Spinner} alt="로딩 중" className="animate-spin h-8 w-8" />
            </div>
          )}
          <img
            src={episode.fullImgUrl}
            alt="웹툰 이미지"
            onLoad={handleLoad}
            className={isLoading ? 'hidden' : 'block'}
          />
        </div>
        <div ref={feedbackRef}>
          <WebtoonFeedback
            hasRated={episode.hasRated}
            myRating={episode.myRating}
            episodeId={episode.episodeNo}
          />
        </div>
      </div>

      <div>{/* 댓글창, 광고창 */}</div>
    </>
  );
}
