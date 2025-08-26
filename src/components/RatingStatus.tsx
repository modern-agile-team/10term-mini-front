import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface RatingStatusProps {
  isRated: boolean;
  myScore: number | null;
  onRateClick: () => void;
}

export default function RatingStatus({ isRated, myScore, onRateClick }: RatingStatusProps) {
  if (isRated) {
    return (
      <div className="w-[300px] h-[120px] flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-1 mb-1">
          <StarIconSolid className="w-5 h-5 text-site-red" />
          <span className="text-site-red font-semibold">{myScore}</span>
        </div>
        <p className="text-sm font-medium">참여완료</p>
      </div>
    );
  }

  return (
    <button
      onClick={onRateClick}
      className="w-[300px] h-[120px] flex flex-col items-center justify-center text-center hover:bg-gray-50"
    >
      <div className="flex items-center gap-1 mb-1">
        <StarIcon className="w-5 h-5 text-site-red" />
        <span className="text-site-red font-semibold">미참여</span>
      </div>
      <p className="text-sm font-medium">별점주기</p>
    </button>
  );
}
