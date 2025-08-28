import { HandThumbDownIcon, HandThumbUpIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import type { Comment } from '@/types/comment';
import { useState, useEffect } from 'react';
import { formatDateFull } from '@/utils/date';
import useCommentDelete from '@/hooks/useCommentDelete';
import useCommentEdit from '@/hooks/useCommentEdit';
import useCommentReaction from '@/hooks/useCommentReaction';

interface ReplyCardProps {
  childComment: Comment;
  maskUsername: (username: string) => string;
  onRefresh?: () => void;
  episodeId?: number;
}

const ReplyCard = ({ childComment, maskUsername, onRefresh }: ReplyCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUsername, setCurrentUsername] = useState<string | null>(null);

  const { handleDelete } = useCommentDelete();
  const {
    editContent,
    isEditing,
    setIsEditing,
    handleEditContent,
    handleCancelEdit,
    handleSubmitEdit,
  } = useCommentEdit(childComment.content);
  const { optimisticComment, handleReaction } = useCommentReaction(childComment);

  useEffect(() => {
    // 현재 로그인한 사용자 username 가져오기
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    setCurrentUsername(user?.username || null);
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setIsMenuOpen(false);
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
                      onClick={() => handleDelete(childComment.id, onRefresh)}
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
                className="w-full p-2 rounded resize-none bg-gray-200 focus:outline-none"
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
                  onClick={() => handleSubmitEdit(childComment.id, onRefresh || (() => {}))}
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
