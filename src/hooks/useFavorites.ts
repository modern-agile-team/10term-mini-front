import { useEffect, useState } from 'react';
import { instance } from '@/apis/axios';

interface FavoriteWebtoon {
  webtoonId: number;
  title: string;
  thumbnailUrl: string;
  writer: string;
  updatedAt: string;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteWebtoon[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    instance
      .get('/api/users/me/favorites')
      .then((res) => {
        setFavorites(res.data.data.content);
      })
      .catch((err) => {
        console.error('관심 웹툰 불러오기 실패:', err);
      });
  }, []);

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
    setSelectedIds([]);
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) {
      alert('삭제할 웹툰을 선택해주세요.');
      return;
    }

    try {
      await instance.delete('/api/users/me/favorites', {
        data: { webtoonIds: selectedIds },
      });

      setFavorites((prev) => prev.filter((webtoon) => !selectedIds.includes(webtoon.webtoonId)));

      setSelectedIds([]);
      setIsEditMode(false);
      setIsModalOpen(false);
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  return {
    favorites,
    isEditMode,
    selectedIds,
    isModalOpen,
    setIsModalOpen,
    toggleEditMode,
    toggleSelect,
    handleDelete,
  };
};
