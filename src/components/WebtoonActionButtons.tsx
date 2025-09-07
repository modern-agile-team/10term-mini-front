import { CheckIcon, PlusIcon, ShareIcon } from '@heroicons/react/24/outline';

interface WebtoonActionButtonsProps {
  isFavorite: boolean;
  favoriteCount: number;
  onFavoriteClick: () => void;
  onShareClick: () => void;
}

const WebtoonActionButtons = ({
  isFavorite,
  favoriteCount,
  onFavoriteClick,
  onShareClick,
}: WebtoonActionButtonsProps) => {
  return (
    <div className="flex space-x-2 mb-5">
      <button
        className={`w-3/4 px-4 py-4 rounded-md border-2 ${
          isFavorite ? 'bg-white text-site-red border-site-red' : 'bg-site-red text-white'
        }`}
        onClick={onFavoriteClick}
      >
        <div className="flex items-center justify-center">
          {isFavorite ? (
            <>
              <CheckIcon className="w-5 h-5 mr-2" />
              관심 {favoriteCount}
            </>
          ) : (
            <>
              <PlusIcon className="w-5 h-5 mr-2" />
              관심 {favoriteCount}
            </>
          )}
        </div>
      </button>
      <button
        className="w-1/4 px-4 py-2 rounded-md bg-gray-100 text-gray-700 flex items-center justify-center"
        onClick={onShareClick}
      >
        <ShareIcon className="w-5 h-5 mr-2" />
        공유하기
      </button>
    </div>
  );
};

export default WebtoonActionButtons;
