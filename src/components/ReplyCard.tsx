import { HandThumbDownIcon, HandThumbUpIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import type { Comment } from '@/types/comment';
import { useState, useEffect } from 'react';
import { formatDateFull } from '@/utils/date';
import useComments from '@/hooks/useComments';

interface ReplyCardProps {
  childComment: Comment;
  maskUsername: (username: string) => string;
  onRefresh?: () => void;
  episodeId?: number;
}

const ReplyCard = ({ childComment, maskUsername, onRefresh, episodeId }: ReplyCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(childComment.content);
  const [optimisticComment, setOptimisticComment] = useState(childComment);
  const [currentUsername, setCurrentUsername] = useState<string | null>(null);

  const { updateComment, deleteComment, toggleReaction } = useComments(episodeId || 0);

  useEffect(() => {
    // 현재 로그인한 사용자 username 가져오기
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    setCurrentUsername(user?.username || null);
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditContent(childComment.content);
    setIsMenuOpen(false);
  };

  const handleEditContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > 500) {
      alert('댓글은 500자까지 작성할 수 있습니다.');
      return;
    }
    setEditContent(value);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(childComment.content);
  };

  const handleSubmitEdit = async () => {
    try {
      if (!editContent.trim()) {
        alert('내용을 입력해주세요.');
        return;
      }

      await updateComment(childComment.id, editContent);
      setIsEditing(false);
      onRefresh?.();
    } catch (error) {
      alert('댓글 수정에 실패했습니다.');
    }
  };

  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm('정말로 이 댓글을 삭제하시겠습니까?');
      if (!confirmDelete) return;

      await deleteComment(childComment.id);
      setIsMenuOpen(false);
      onRefresh?.();
    } catch (error) {
      alert('댓글 삭제에 실패했습니다.');
    }
  };

  const handleReaction = async (type: 'like' | 'dislike') => {
    try {
      if (!localStorage.getItem('user')) {
        alert('로그인이 필요합니다.');
        return;
      }

      const currentReaction = optimisticComment.reaction.userReaction;

      // 낙관적 업데이트를 위한 상태 업데이트 함수
      const updateLocalReaction = (newReaction: 'like' | 'dislike' | null) => {
        setOptimisticComment((prev) => ({
          ...prev,
          reaction: {
            ...prev.reaction,
            userReaction: newReaction,
            likeCount:
              prev.reaction.likeCount +
              (newReaction === 'like' ? 1 : currentReaction === 'like' ? -1 : 0),
            dislikeCount:
              prev.reaction.dislikeCount +
              (newReaction === 'dislike' ? 1 : currentReaction === 'dislike' ? -1 : 0),
          },
        }));
      };

      // 서버 요청
      await toggleReaction(childComment.id, currentReaction, type, updateLocalReaction);
    } catch (error) {
      console.error('댓글 반응 업데이트 실패:', error);
      alert('댓글 반응 업데이트에 실패했습니다.');
    }
  };

  return (
    <div className="flex p-5 border-t border-b border-gray-300 bg-gray-200">
      <span className="text-gray-400">ㄴ</span>
      <div className="py-2 ml-2 w-full">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <div className="text-base">
              <span>{optimisticComment.user.nickname}</span>
              <span>({maskUsername(optimisticComment.user.username)})</span>
            </div>
            <span className="text-gray-500 text-sm">
              {optimisticComment.createdAt !== optimisticComment.updatedAt
                ? `${formatDateFull(optimisticComment.updatedAt)} (수정됨)`
                : formatDateFull(optimisticComment.createdAt)}
            </span>
          </div>

          <div className="relative">
            {currentUsername === optimisticComment.user.username && (
              <>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  <EllipsisVerticalIcon className="w-6 h-6 text-gray-500" />
                </button>
                {isMenuOpen && (
                  <div className="absolute left-7 top-2 w-28 bg-white rounded-md shadow-lg z-10 border">
                    <button
                      onClick={handleEdit}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      수정
                    </button>
                    <button
                      onClick={handleDelete}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      삭제
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="my-3">
          {isEditing ? (
            <div className="space-y-2 border-2 border-gray-300">
              <textarea
                value={editContent}
                onChange={handleEditContent}
                className="w-full p-2 rounded resize-none bg-white focus:outline-none"
                rows={3}
              />
              <div className="p-4 flex justify-end items-center space-x-2">
                <span
                  className={`text-sm ${
                    editContent.length >= 500 ? 'text-red-500' : 'text-gray-500'
                  }`}
                >
                  {editContent.length}/500
                </span>
                <button
                  onClick={handleCancelEdit}
                  className="px-3 py-1 text-sm text-gray-600 border rounded hover:bg-gray-100"
                >
                  취소
                </button>
                <button
                  onClick={handleSubmitEdit}
                  className="flex justify-center items-center h-8 w-8 text-sm rounded-full text-white bg-site-red hover:bg-red-700"
                >
                  <PaperAirplaneIcon className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>
          ) : (
            <p className="whitespace-pre-wrap">{optimisticComment.content}</p>
          )}
        </div>

        <div className="flex justify-end items-center mt-3">
          <div className="flex items-center">
            <button
              className="flex items-center px-2 py-1 ml-4 bg-gray-100"
              onClick={() => handleReaction('like')}
            >
              <HandThumbUpIcon
                className={`w-4 h-4 ${
                  optimisticComment.reaction.userReaction === 'like'
                    ? 'text-site-green'
                    : 'text-gray-300'
                }`}
              />
              <span className="ml-2 text-sm">{optimisticComment.reaction.likeCount}</span>
            </button>
            <button
              className="flex items-center px-2 py-1 ml-4 bg-gray-100"
              onClick={() => handleReaction('dislike')}
            >
              <HandThumbDownIcon
                className={`w-4 h-4 ${
                  optimisticComment.reaction.userReaction === 'dislike'
                    ? 'text-red-500'
                    : 'text-gray-300'
                }`}
              />
              <span className="ml-2 text-sm">{optimisticComment.reaction.dislikeCount}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyCard;
