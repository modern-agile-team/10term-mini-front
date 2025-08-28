import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import useLocalStorage from '@/hooks/useLocalStorage';
import useReplyInput from '@/hooks/useReplyInput';
import type { User } from '@/types/auth';
import { useNavigate } from 'react-router';

interface ReplyInputProps {
  episodeId: number;
  parentId: number;
  onReplySuccess?: () => void;
}

const ReplyInput = ({ episodeId, parentId, onReplySuccess }: ReplyInputProps) => {
  const navigate = useNavigate();
  const [currentUser] = useLocalStorage<User>('user', {
    nickname: '',
    username: '',
  });

  const { replyComment, handleChangeReply, handleSubmitReply, isSubmitting } = useReplyInput(
    parentId,
    episodeId,
    currentUser,
    onReplySuccess,
  );

  const handleTextareaClick = () => {
    if (!currentUser.username) {
      alert('로그인을 하신 후 이용해 주시길 바랍니다');
      navigate('/login');
    }
  };

  return (
    <div className="flex p-5 border-b border-gray-300 bg-gray-200">
      <span className="text-gray-400">ㄴ</span>
      <div className="w-full h-[200px] px-4 py-3 mt-4 rounded-md border-2 border-gray-300 bg-gray-100">
        {currentUser.username ? (
          <div>
            <span>{currentUser.nickname}</span>
            <span>({currentUser.username.slice(0, 4)}****)</span>
          </div>
        ) : null}
        <div className="py-3">
          <textarea
            className="w-full h-[80px] resize-none rounded-md overflow-y-scroll bg-gray-100 focus:outline-none"
            placeholder={
              currentUser.username
                ? '답글을 작성해주세요'
                : '로그인 한 사용자만 댓글을 작성할 수 있습니다'
            }
            value={replyComment}
            onChange={handleChangeReply}
            disabled={isSubmitting}
            onClick={handleTextareaClick}
          />
        </div>
        <div className="flex justify-end items-center text-gray-500">
          <span className={`${replyComment.length >= 500 ? 'text-site-red' : ''}`}>
            {replyComment.length}
          </span>
          /500
          <button
            className={`h-8 w-8 ml-3 rounded-full flex items-center justify-center ${
              replyComment && !isSubmitting ? 'bg-site-red' : 'bg-gray-300'
            }`}
            onClick={() => handleSubmitReply()}
            disabled={isSubmitting || !replyComment.trim()}
          >
            <PaperAirplaneIcon className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplyInput;
