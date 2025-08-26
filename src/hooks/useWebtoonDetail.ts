import type { WebtoonDetailInfo, WebtoonEpisode } from '@/types/webtoonDetail';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useAdvertisement } from '@/hooks/useAdvertisement';
import { requestWebtoonDetail, requestWebtoonEpisodes } from '@/apis/webtoonDetail';
import type { DayOfWeek } from '@/constants/date.constants';
import { useWebtoonActions } from '@/hooks/useWebtoonActions';

export const useWebtoonDetail = (webtoonId: number) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const clickedDay = searchParams.get('day') as DayOfWeek | null;
  const [webtoonDetail, setWebtoonDetail] = useState<WebtoonDetailInfo | null>(null);
  const [error, setError] = useState<string>('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [episodes, setEpisodes] = useState<WebtoonEpisode[]>([]);
  const { randomAdvertisementLarge, randomAdvertisementSmall } = useAdvertisement({
    day: clickedDay,
    keyword: null,
  });

  const { toggleFavorite: handleFavorite, shareWebtoon: handleShare } = useWebtoonActions({
    webtoonId,
    isFavorite,
    onFavoriteUpdate: setIsFavorite,
    onWebtoonUpdate: (prevDetail) =>
      prevDetail && {
        ...prevDetail,
        favoriteCount: isFavorite ? prevDetail.favoriteCount - 1 : prevDetail.favoriteCount + 1,
      },
    setWebtoonDetail,
  });

  useEffect(() => {
    const getWebtoonDetail = async () => {
      try {
        const [webtoonResponse, episodesResponse] = await Promise.all([
          requestWebtoonDetail(webtoonId),
          requestWebtoonEpisodes(webtoonId),
        ]);

        setWebtoonDetail(webtoonResponse);
        setIsFavorite(webtoonResponse.isFavorite);
        setEpisodes(episodesResponse);

        if (!clickedDay && webtoonResponse.weekdays[0]) {
          setSearchParams({ day: webtoonResponse.weekdays[0] }, { replace: true });
        }
      } catch (err) {
        console.error(err);
        setError('웹툰 정보를 불러오지 못했습니다.');
      }
    };

    getWebtoonDetail();
  }, [webtoonId]);

  return {
    webtoonDetail,
    error,
    isFavorite,
    episodes,
    randomAdvertisementLarge,
    randomAdvertisementSmall,
    handleFavorite,
    handleShare,
  };
};
