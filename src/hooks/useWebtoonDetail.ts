import type { WebtoonDetailInfo, WebtoonEpisode } from '@/types/webtoonDetail';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import {
  largeAdvertisementImages,
  smallAdvertisementImages,
} from '@/constants/advertisement.constants';
import {
  requestAddFavorite,
  requestRemoveFavorite,
  requestWebtoonDetail,
  requestWebtoonEpisodes,
} from '@/apis/webtoonDetail';
import type { DayOfWeek } from '@/constants/date.constants';

export const useWebtoonDetail = (webtoonId: number) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const clickedDay = searchParams.get('day') as DayOfWeek | null;
  const [webtoonDetail, setWebtoonDetail] = useState<WebtoonDetailInfo | null>(null);
  const [error, setError] = useState<string>('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [episodes, setEpisodes] = useState<WebtoonEpisode[]>([]);
  const [randomAdvertisementLarge, setRandomAdvertisementLarge] = useState<string>('');
  const [randomAdvertisementSmall, setRandomAdvertisementSmall] = useState<string>('');

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
          setSearchParams({ day: webtoonResponse.weekdays[0] });
        }
      } catch (err) {
        console.error(err);
        setError('웹툰 정보를 불러오지 못했습니다.');
      }
    };

    getWebtoonDetail();
  }, [webtoonId, searchParams, setSearchParams]);

  useEffect(() => {
    const getRandomAdvertisementImage = (images: readonly string[]): string => {
      const index = Math.floor(Math.random() * images.length);
      return images[index];
    };

    setRandomAdvertisementLarge(getRandomAdvertisementImage(largeAdvertisementImages));
    setRandomAdvertisementSmall(getRandomAdvertisementImage(smallAdvertisementImages));
  }, [webtoonId]);

  const handleFavorite = async () => {
    try {
      if (!localStorage.getItem('user')) {
        alert('로그인이 필요합니다.');
        return;
      }

      await (isFavorite ? requestRemoveFavorite(webtoonId) : requestAddFavorite(webtoonId));

      setIsFavorite(!isFavorite);
      setWebtoonDetail((prev) =>
        prev
          ? {
              ...prev,
              favoriteCount: isFavorite ? prev.favoriteCount - 1 : prev.favoriteCount + 1,
            }
          : null,
      );
    } catch (err) {
      console.error('관심 업데이트 실패:', err);
      alert('관심 웹툰 업데이트에 실패했습니다.');
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('URL이 복사되었습니다.');
  };

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
