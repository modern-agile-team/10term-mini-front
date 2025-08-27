import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

interface ReplyInputProps {
  replyComment: string;
  handleChangeReply: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmitReply: () => void;
}

const ReplyInput = ({ replyComment, handleChangeReply, handleSubmitReply }: ReplyInputProps) => {
  return (
    <div className="flex p-5 border-b border-gray-300 bg-gray-200">
      <span className="text-gray-400">ㄴ</span>
      {/* 헤더 */}
      <div className="w-full h-[200px] px-4 py-3 mt-4 rounded-md border-2 border-gray-300 bg-gray-100">
        <div>
          <span>Lacryma</span>
          <span>({'myid****'})</span>
        </div>
        <div className="py-3">
          <textarea
            className="w-full h-[80px] resize-none rounded-md overflow-y-scroll bg-gray-100 focus:outline-none"
            placeholder="주제와 무관한 내용 및 악플은 삭제될 수 있습니다"
            value={replyComment}
            onChange={handleChangeReply}
          />
        </div>
        <div className="flex justify-end items-center text-gray-500">
          <span className={`${replyComment.length >= 500 ? 'text-site-red' : ''}`}>
            {replyComment.length}
          </span>
          /500
          <button
            className={`h-8 w-8 ml-3 rounded-full flex items-center justify-center ${replyComment ? 'bg-site-red' : 'bg-gray-300'}`}
            onClick={handleSubmitReply}
          >
            <PaperAirplaneIcon className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplyInput;
