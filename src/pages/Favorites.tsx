import { useEffect, useState } from 'react';
import { instance } from '@/apis/axios';
import { formatDateShort } from '@/utils/date';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import DeleteFavoriteModal from '@/components/DeleteFavoriteModal';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
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
    setSelectedIds([]); // 편집 모드 껐다 켤 때 선택 초기화
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
      const res = await instance.delete('/api/users/me/favorites', {
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

  return (
    <>
      {isModalOpen && (
        <DeleteFavoriteModal onConfirm={handleDelete} onCancel={() => setIsModalOpen(false)} />
      )}
      <div className="flex justify-between mt-[50px]">
        <div>
          <span className="mr-4 text-xl font-semibold">관심웹툰</span>
          <span>전체 {favorites.length}</span>
        </div>
        {isEditMode && (
          <button onClick={() => setIsModalOpen(true)} className="ml-auto px-4 text-sm">
            선택 삭제
          </button>
        )}
        <button onClick={toggleEditMode} className="text-sm">
          {isEditMode ? '완료' : '편집'}
        </button>
      </div>
      <div className="flex border-t border-b mt-4 py-4 text-left">
        <div className="w-1/3 ml-[100px]">이미지</div>
        <div className="w-1/3">작품명</div>
        <div className="w-1/3">{isEditMode ? '삭제 선택' : '업데이트일'}</div>
      </div>
      {favorites.map((webtoon) => (
        <div key={webtoon.webtoonId} className="flex items-center border-b py-4">
          <div className="w-1/3 flex ml-[80px]">
            <img
              src={webtoon.thumbnailUrl}
              alt={webtoon.title}
              className="w-20 h-28 object-cover rounded"
            />
          </div>
          <div className="w-1/3 text-left ml-[22px]">
            <p className="text-lg font-semibold">{webtoon.title}</p>
            <p className="text-sm text-gray-500">{webtoon.writer}</p>
          </div>
          <div className="w-1/3 ml-[10px] text-left">
            <p className="text-md text-gray-400">
              {isEditMode ? (
                <button onClick={() => toggleSelect(webtoon.webtoonId)}>
                  <CheckCircleIcon
                    className={`w-10 h-10 ml-2 transition-colors duration-200 ${
                      selectedIds.includes(webtoon.webtoonId) ? 'text-green-500' : 'text-gray-300'
                    }`}
                  />
                </button>
              ) : (
                formatDateShort(webtoon.updatedAt)
              )}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}

export default Favorites;
