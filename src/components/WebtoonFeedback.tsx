import { useState } from 'react';
import { submitRating } from '@/apis/webtoonViewer';
import RatingModal from './RatingModal';
import RatingStatus from './RatingStatus';

interface WebtoonFeedbackProps {
  hasRated: boolean | null;
  myRating: number | null;
  episodeId: number;
  isLoggedIn: boolean;
}

export default function WebtoonFeedback({
  hasRated,
  myRating,
  episodeId,
  isLoggedIn,
}: WebtoonFeedbackProps) {
  const [selectedRating, setSelectedRating] = useState(0);
  const [myScore, setMyScore] = useState(myRating);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [localRated, setLocalRated] = useState(false);

  const handleRate = async (score: number) => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      await submitRating(episodeId, score);
      setMyScore(score);
      setSelectedRating(0);
      setIsModalOpen(false);
      setLocalRated(true);
      alert(`${score}점이 등록되었습니다.`);
    } catch (e) {
      console.error('별점 등록 실패', e);
      alert('별점 등록에 실패했습니다.');
    }
  };

  return (
    <div className="mb-28 flex border divide-x">
      <RatingStatus
        isRated={hasRated || localRated}
        myScore={myScore}
        onRateClick={() => {
          if (!isLoggedIn) {
            alert('로그인이 필요합니다.');
            return;
          }
          setIsModalOpen(true);
        }}
      />

      <RatingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleRate}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
        hoverRating={hoverRating}
        setHoverRating={setHoverRating}
      />
    </div>
  );
}
