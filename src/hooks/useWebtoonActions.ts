import type { WebtoonDetailInfo } from '@/types/webtoonDetail';
import { requestAddFavorite, requestRemoveFavorite } from '@/apis/webtoonDetail';

interface UseWebtoonActionsProps {
  webtoonId: number;
  isFavorite: boolean;
  onFavoriteUpdate: (isFavorite: boolean) => void;
  onWebtoonUpdate: (prevDetail: WebtoonDetailInfo | null) => WebtoonDetailInfo | null;
  setWebtoonDetail: React.Dispatch<React.SetStateAction<WebtoonDetailInfo | null>>;
}

export const useWebtoonActions = ({
  webtoonId,
  isFavorite,
  onFavoriteUpdate,
  onWebtoonUpdate,
  setWebtoonDetail,
}: UseWebtoonActionsProps) => {
  const toggleFavorite = async () => {
    try {
      if (!localStorage.getItem('user')) {
        alert('로그인이 필요합니다.');
        return;
      }

      await (isFavorite ? requestRemoveFavorite(webtoonId) : requestAddFavorite(webtoonId));

      onFavoriteUpdate(!isFavorite);
      setWebtoonDetail(onWebtoonUpdate);
    } catch (err) {
      console.error('관심 업데이트 실패:', err);
      alert('관심 웹툰 업데이트에 실패했습니다.');
    }
  };

  const shareWebtoon = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('URL이 복사되었습니다.');
  };

  return {
    toggleFavorite,
    shareWebtoon,
  };
};
