import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { requestCreateComment } from '@/apis/comment';
import type { Comment, NewCommentRequest } from '@/types/comment';
import useLocalStorage from '@/hooks/useLocalStorage';
import type { User } from '@/types/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router';

interface ReplyInputProps {
  replyComment: string;
  handleChangeReply: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmitReply: () => void;
  episodeId: number;
  parentId: number;
  onReplySuccess?: () => void;
  onOptimisticUpdate?: (tempComment: Comment) => void;
}

const ReplyInput = ({
  replyComment,
  handleChangeReply,
  handleSubmitReply,
  episodeId,
  parentId,
  onReplySuccess,
  onOptimisticUpdate,
}: ReplyInputProps) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser] = useLocalStorage<User>('user', {
    nickname: '',
    username: '',
  });

  const createTempComment = (content: string): Comment => ({
    id: Date.now(),
    content,
    parentId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    user: {
      userId: -1,
      username: currentUser.username,
      nickname: currentUser.nickname,
    },
    reaction: {
      likeCount: 0,
      dislikeCount: 0,
      userReaction: null,
    },
    children: [],
  });

  const handleTextareaClick = () => {
    if (!currentUser.username) {
      alert('로그인을 하신 후 이용해 주시길 바랍니다');
      navigate('/login');
    }
  };

  const handleSubmit = async () => {
    const trimmed = replyComment.trim();
    if (!trimmed || isSubmitting) return;

    const tempComment = createTempComment(trimmed);

    try {
      setIsSubmitting(true);
      onOptimisticUpdate?.(tempComment);

      const newReplyData: NewCommentRequest = {
        content: trimmed,
        parentId,
      };

      await requestCreateComment(episodeId, newReplyData);
      handleSubmitReply(); // 입력값 초기화

      onReplySuccess?.();
    } catch (error) {
      console.error('답글 작성 실패:', error);
      alert('답글 작성에 실패했습니다. 다시 시도해주세요.');
      onReplySuccess?.();
    } finally {
      setIsSubmitting(false);
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
            onClick={handleSubmit}
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
