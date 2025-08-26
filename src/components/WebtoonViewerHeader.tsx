import { ChevronLeftIcon } from '@heroicons/react/24/outline';

export default function WebtoonViewerHeader() {
  return (
    <div className="w-full h-16 bg-gray-300 text-black flex items-center">
      <button>
        <ChevronLeftIcon className="w-6 h-6 ml-4" />
      </button>
      <h1 className="text-xl font-bold">Webtoon Viewer</h1>
    </div>
  );
}
