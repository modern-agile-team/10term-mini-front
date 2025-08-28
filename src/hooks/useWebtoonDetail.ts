import type { WebtoonDetailInfo, WebtoonEpisode } from '@/types/webtoonDetail';
import { useState, useEffect, useRef } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);
  const { randomAdvertisementLarge, randomAdvertisementSmall } = useAdvertisement({
    day: clickedDay,
    keyword: null,
    isViewer: false,
  });
  const abortControllerRef = useRef<AbortController | null>(null);

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
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      setIsLoading(true);
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
        if ((err as Error).name === 'AbortError') {
          console.log('Request aborted');
        } else {
          console.error('Error fetching webtoon details:', err);
          setError('웹툰 정보를 불러오지 못했습니다. 네트워크 상태를 확인해주세요.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    getWebtoonDetail();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
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
    isLoading,
  };
};
