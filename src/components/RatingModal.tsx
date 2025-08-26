import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (rating: number) => void;
  selectedRating: number;
  setSelectedRating: (rating: number) => void;
  hoverRating: number;
  setHoverRating: (rating: number) => void;
}

export default function RatingModal({
  isOpen,
  onClose,
  onConfirm,
  selectedRating,
  setSelectedRating,
  hoverRating,
  setHoverRating,
}: RatingModalProps) {
  const handleStarHover = (starIndex: number, position: number) => {
    const rating = starIndex * 2 + (position < 0.5 ? 1 : 2);
    setHoverRating(rating);
  };

  const renderStars = () => {
    const stars = [];
    const rating = hoverRating || selectedRating;

    for (let i = 0; i < 5; i++) {
      const starValue = (i + 1) * 2;
      stars.push(
        <div
          key={i}
          className="relative w-12 h-12 cursor-pointer"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const position = (e.clientX - rect.left) / rect.width;
            handleStarHover(i, position);
          }}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => setSelectedRating(hoverRating)}
        >
          <StarIcon className="w-full h-full absolute text-gray-300" />
          <div
            className="absolute overflow-hidden"
            style={{
              width: `${rating > starValue ? 100 : rating > starValue - 2 ? (rating % 2 === 1 ? 50 : 100) : 0}%`,
            }}
          >
            <StarIconSolid className="w-12 h-12 text-site-red" />
          </div>
        </div>,
      );
    }
    return stars;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white px-4 py-6 shadow-xl">
        <h3 className="text-4xl mb-4 text-center text-site-red">{hoverRating || selectedRating}</h3>
        <div className="flex mb-4 justify-center">{renderStars()}</div>
        <div className="text-center text-sm mb-8">
          <span className="text-gray-500">별을 클릭하세요.</span>
        </div>
        <div className="flex flex-col justify-center gap-x-4 gap-y-3">
          <button
            onClick={() => onConfirm(selectedRating)}
            disabled={!selectedRating}
            className={`w-[300px] px-4 py-4 rounded-md text-white ${
              selectedRating ? 'bg-site-red hover:bg-red-700' : 'bg-gray-300'
            }`}
          >
            확인
          </button>
          <button
            onClick={onClose}
            className="w-[300px] px-4 py-4 border rounded-md hover:bg-gray-100"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
