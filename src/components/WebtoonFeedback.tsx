import { HeartIcon, StarIcon } from '@heroicons/react/24/outline';

interface WebtoonFeedbackProps {
  likeCount: number;
  ratingAvg: number;
  ratingCount: number;
}

export default function WebtoonFeedback({
  likeCount,
  ratingAvg,
  ratingCount,
}: WebtoonFeedbackProps) {
  return (
    <div className="mb-28 flex border divide-x">
      <div className="w-[300px] h-[120px] flex flex-col items-center justify-center text-center">
        <HeartIcon className="w-6 h-6 mb-1 text-black" />
        <p className="text-sm font-medium">좋아요</p>
        <p className="text-sm text-gray-400">{likeCount.toLocaleString()}</p>
      </div>

      <div className="w-[300px] h-[120px] flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-1 mb-1">
          <StarIcon className="w-5 h-5 text-red-500" />
          <span className="text-red-500 font-semibold">{ratingAvg.toFixed(2)}</span>
        </div>
        <p className="text-sm font-medium">별점주기</p>
        <p className="text-sm text-gray-400">{ratingCount.toLocaleString()} 참여</p>
      </div>
    </div>
  );
}
