import useFavoritesData from '@/hooks/useFavoritesData';
import useFavoritesUI from '@/hooks/useFavoritesUI';

export default function useFavorites() {
  const data = useFavoritesData();
  const ui = useFavoritesUI();

  const handleConfirmDelete = async () => {
    try {
      await data.deleteFavorites(ui.selectedIds);
      ui.resetSelection();
      ui.toggleEditMode();
      ui.setIsModalOpen(false);
    } catch {
      alert('삭제에 실패했습니다.');
    }
  };

  return {
    ...data,
    ...ui,
    handleConfirmDelete,
  };
}
