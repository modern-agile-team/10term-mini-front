import { useEffect, useState } from 'react';
import { requestDeleteFavorites, requestFavorites } from '@/apis/favorites';
import type { FavoriteWebtoon } from '@/types';

export default function useFavoritesData() {
  const [favorites, setFavorites] = useState<FavoriteWebtoon[]>([]);

  const fetchFavorites = async () => {
    try {
      const res = await requestFavorites();
      setFavorites(res);
    } catch (err) {
      console.error('관심 웹툰 불러오기 실패:', err);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const deleteFavorites = async (ids: number[]) => {
    try {
      await requestDeleteFavorites(ids);
      setFavorites((prev) => prev.filter((webtoon) => !ids.includes(webtoon.webtoonId)));
    } catch (err) {
      console.error('관심 웹툰 삭제 실패:', err);
    }
  };

  return {
    favorites,
    deleteFavorites,
  };
}
