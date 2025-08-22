import { Advertisement } from '@/components/Advertisement';
import { EpisodeList } from '@/components/EpisodeList';
import { WebtoonActionButtons } from '@/components/WebtoonActionButtons';
import { WebtoonInfo } from '@/components/WebtoonInfo';
import { useWebtoonDetail } from '@/hooks/useWebtoonDetail';
import { useParams } from 'react-router';

export default function WebtoonDetail() {
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
    handleShare,
  } = useWebtoonDetail(webtoonId);

  if (error) return <div>Error: {error}</div>;
  if (!webtoonDetail) return <div>Loading...</div>;

  return (
    <div className="flex justify-between">
      <div className="w-2/3">
        <WebtoonInfo {...webtoonDetail} />
        <WebtoonActionButtons
          isFavorite={isFavorite}
          favoriteCount={webtoonDetail.favoriteCount}
          onFavoriteClick={handleFavorite}
          onShareClick={handleShare}
        />
        <EpisodeList episodes={episodes} webtoonId={webtoonId} />
      </div>
      <Advertisement largeAdSrc={randomAdvertisementLarge} smallAdSrc={randomAdvertisementSmall} />
    </div>
  );
}
