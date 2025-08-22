import { formatDateShort } from '@/utils/date';
import { CheckIcon, PlusIcon, ShareIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { useParams } from 'react-router';
import { useWebtoonDetail } from '@/hooks/useWebtoonDetail';

function WebtoonDetail() {
  const { id } = useParams();
  const webtoonId = Number(id);
  const {
    webtoonDetail,
    error,
    isFavorite,
    episodes,
    randomAdvertisementLarge,
    randomAdvertisementSmall,
    handleFavorite,
  } = useWebtoonDetail(webtoonId);

  if (error) return <div>Error: {error}</div>;
  if (!webtoonDetail) return <div>Loading...</div>;

  return (
    <div className="flex justify-between">
      <div className="w-2/3">
        {/* 웹툰 메타 정보 */}
        <div className="flex my-5 space-x-4">
          <img
            src={webtoonDetail.thumbnailUrl}
            alt={webtoonDetail.title}
            className="border"
            width={193}
            height={250}
          />
          <div className="flex flex-col space-y-2">
            <h1 className="text-xl font-medium">{webtoonDetail.title}</h1>
            <div className="flex space-x-2">
              <h2 className="font-bold">{webtoonDetail.writer}</h2>
              <h2>· 글/그림</h2>
            </div>
            <p className="whitespace-pre-line">{webtoonDetail.description}</p>
          </div>
        </div>
        <div className="flex space-x-2 mb-5">
          <button
            className={`w-3/4 px-4 py-4 rounded-md border-2 ${
              isFavorite ? 'bg-white text-site-red  border-site-red' : 'bg-site-red text-white'
            }`}
            onClick={handleFavorite}
          >
            <div className="flex items-center justify-center">
              {isFavorite ? (
                <>
                  <CheckIcon className="w-5 h-5 mr-2" />
                  관심 {webtoonDetail.favoriteCount}
                </>
              ) : (
                <>
                  <PlusIcon className="w-5 h-5 mr-2" />
                  관심 {webtoonDetail.favoriteCount}
                </>
              )}
            </div>
          </button>
          <button
            className="w-1/4 px-4 py-2 rounded-md bg-gray-100 text-gray-700 flex items-center justify-center"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('URL이 복사되었습니다.');
            }}
          >
            <ShareIcon className="w-5 h-5 mr-2" />
            공유하기
          </button>
        </div>
        <p className="py-2 border-t border-b">총 {episodes.length}화</p>
        {episodes.map((episode) => (
          <div key={episode.id} className="py-2 border-b flex items-center space-x-4">
            <img
              src={episode.thumbnailUrl}
              alt={`${episode.episodeNo}화`}
              className="w-[120px] h-[70px] object-cover"
            />
            <div className="flex flex-col">
              <h3 className="font-medium">
                {episode.episodeNo}화 {episode.title}
              </h3>
              <div className="flex gap-x-2">
                <span className="flex items-center gap-x-0.5 text-sm text-gray-500">
                  <StarIcon className="w-4 h-4" /> {episode.ratingAvg}
                </span>
                <span className="text-sm text-gray-500">{formatDateShort(episode.postedTime)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-20 w-1/4 space-y-4">
        <img src={randomAdvertisementLarge} alt="대형 광고" />
        <img src={randomAdvertisementSmall} alt="소형 광고" />
      </div>
    </div>
  );
}

export default WebtoonDetail;
