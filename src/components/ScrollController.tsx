import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface ScrollControllerProps {
  targetRef: React.RefObject<HTMLDivElement | null>;
}

export default function ScrollController({ targetRef }: ScrollControllerProps) {
  const scrollToBottom = () => {
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 fixed right-8 bottom-12 z-50">
      <button
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
      >
        <ChevronUpIcon className="w-6 h-6 text-black" />
      </button>

      <button
        aria-label="Scroll to bottom"
        onClick={scrollToBottom}
        className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
      >
        <ChevronDownIcon className="w-6 h-6 text-black" />
      </button>
    </div>
  );
}
