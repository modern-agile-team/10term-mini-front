import { HandThumbDownIcon, HandThumbUpIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';
import type { Comment } from '@/types/comment';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import ReplyCard from './ReplyCard';
import ReplyInput from './ReplyInput';
import { formatDateFull } from '@/utils/date';
import useCommentDelete from '@/hooks/useCommentDelete';
import useCommentEdit from '@/hooks/useCommentEdit';
import useCommentReaction from '@/hooks/useCommentReaction';

interface CommentCardProps {
  comment: Comment;
  episodeId: number;
  onRefresh?: () => void;
  isReplyOpen?: boolean;
  onToggleReply?: () => void;
}

const CommentCard = ({
  comment,
  episodeId,
  onRefresh,
  isReplyOpen = false,
  onToggleReply,
}: CommentCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUsername, setCurrentUsername] = useState<string | null>(null);

  const { handleDelete } = useCommentDelete();
  const {
    editContent,
    isEditing,
    setIsEditing,
    handleEditContent,
    handleCancelEdit,
    handleSubmitEdit: submitEdit,
  } = useCommentEdit(comment.content);
  const { optimisticComment, handleReaction } = useCommentReaction(comment);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    setCurrentUsername(user?.username || null);
  }, []);

  const maskUsername = (username: string) => {
    if (!username) return '***';
    return username.slice(0, 4) + '****';
  };

  const handleEdit = () => {
    setIsEditing(true);
    setIsMenuOpen(false);
  };

  const onEditSubmit = () => {
    submitEdit(comment.id, onRefresh || (() => {}));
  };

  return (
    <div key={comment.id} className="pt-5">
      {/* 헤더 */}
      <div className="flex justify-between items-start">
        {/* 왼쪽: 기존 유저 정보 */}
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

        {/* 오른쪽: 점 세 개 버튼 + 수정 or 삭제 */}
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
                    onClick={() => handleDelete(comment.id, onRefresh)}
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
      {/* 바디 */}
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
                className={`text-sm ${editContent.length >= 500 ? 'text-red-500' : 'text-gray-500'}`}
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
                onClick={onEditSubmit}
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
      {/* 푸터 */}
      <div className="flex justify-between items-center my-4">
        <button className="px-2 py-1 bg-gray-100" onClick={onToggleReply}>
          답글 {optimisticComment.children.length}
        </button>
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

      {/* 대댓글 리스트 */}
      {isReplyOpen &&
        optimisticComment.children.map((childComment) => (
          <ReplyCard
            key={childComment.id}
            childComment={childComment}
            maskUsername={maskUsername}
            onRefresh={onRefresh}
            episodeId={episodeId}
          />
        ))}

      {/* 대댓글 작성 폼 */}
      {isReplyOpen && (
        <ReplyInput episodeId={episodeId} parentId={comment.id} onReplySuccess={onRefresh} />
      )}
    </div>
  );
};

export default CommentCard;
