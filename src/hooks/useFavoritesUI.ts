import { useState } from 'react';

export default function useFavoritesUI() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
    setSelectedIds([]);
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const resetSelection = () => {
    setSelectedIds([]);
  };

  return {
    isEditMode,
    toggleEditMode,
    selectedIds,
    toggleSelect,
    resetSelection,
    isModalOpen,
    setIsModalOpen,
  };
}
