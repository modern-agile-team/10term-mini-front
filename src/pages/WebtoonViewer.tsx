import { useRef } from 'react';
import { useParams } from 'react-router';
import WebtoonFeedback from '@/components/WebtoonFeedback';
import WebtoonViewerHeader from '@/components/WebtoonViewerHeader';
import ScrollController from '@/components/ScrollController';
import Spinner from '@/assets/spinner.svg';
import { useWebtoonViewer } from '@/hooks/useWebtoonViewer';
import { useAdvertisement } from '@/hooks/useAdvertisement';
import { Advertisement } from '@/components/Advertisement';
import CommentSection from '@/components/CommentSection';

export default function WebtoonViewer() {
  const { episodeid } = useParams();
  const feedbackRef = useRef<HTMLDivElement | null>(null);
  const { isLoading, isImageLoading, episode, handleImageLoad } = useWebtoonViewer(episodeid);
  const isLoggedIn = Boolean(localStorage.getItem('user'));
  const { randomAdvertisementLarge, randomAdvertisementSmall } = useAdvertisement({
    day: null,
    keyword: null,
    isViewer: true,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <img src={Spinner} alt="로딩 중" className="animate-spin h-8 w-8" />
      </div>
    );
  }

  if (!episode) return <div>에피소드를 찾을 수 없습니다...</div>;

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
          {isImageLoading && (
            <div className="flex justify-center items-center py-10">
              <img src={Spinner} alt="이미지 로딩 중" className="animate-spin h-8 w-8" />
            </div>
          )}
          <img
            src={episode.fullImgUrl}
            alt="웹툰 이미지"
            onLoad={handleImageLoad}
            className={isImageLoading ? 'hidden' : 'block'}
          />
        </div>
        <div ref={feedbackRef}>
          <WebtoonFeedback
            hasRated={episode.hasRated}
            myRating={episode.myRating}
            episodeId={episode.id}
            isLoggedIn={isLoggedIn}
          />
        </div>
      </div>

      <div className="flex justify-between w-[1190px] mx-auto">
        <CommentSection episodeId={episode.id} />
        <Advertisement
          largeAdSrc={randomAdvertisementLarge}
          smallAdSrc={randomAdvertisementSmall}
        />
      </div>
    </>
  );
}
