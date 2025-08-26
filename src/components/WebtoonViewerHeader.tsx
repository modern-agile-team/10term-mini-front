import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router';

interface WebtoonViewerHeaderProps {
  webtoonTitle: string;
  episodeNo: number;
  episodeTitle: string;
}

export default function WebtoonViewerHeader({
  webtoonTitle,
  episodeNo,
  episodeTitle,
}: WebtoonViewerHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="w-full h-16 bg-gray-200 text-black flex items-center">
      <div className="flex w-[1190px] mx-auto items-center">
        <button onClick={() => navigate(-1)}>
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <h1 className="ml-3 text-lg">{webtoonTitle}</h1>
        <h2 className="ml-3 text-lg">{episodeNo}.</h2>
        <h2 className="ml-1 text-lg">{episodeTitle}</h2>
      </div>
    </div>
  );
}
