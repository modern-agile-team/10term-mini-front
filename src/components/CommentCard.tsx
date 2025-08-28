import { HandThumbDownIcon, HandThumbUpIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';
import type { Comment } from '@/types/comment';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import ReplyCard from './ReplyCard';
import ReplyInput from './ReplyInput';
import { formatDateFull } from '@/utils/date';
import {
  requestToggleCommentReaction,
  requestUpdateComment,
  requestDeleteComment,
} from '@/apis/comment';

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
  const [replyComment, setReplyComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [optimisticComment, setOptimisticComment] = useState(comment);

  const maskUsername = (username: string) => {
    if (!username) return '***';
    return username.slice(0, 4) + '****';
  };

  const handleChangeReply = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > 500) return;
    setReplyComment(value);
  };

  const handleSubmitReply = () => {
    const trimmed = replyComment.trim();
    if (!trimmed) return;
    console.log('대댓글 전송됨:', trimmed);
    // TODO: 여기에 대댓글 작성 API 호출 로직 추가
    setReplyComment('');
  };

  const handleReaction = async (type: 'like' | 'dislike') => {
    try {
      if (!localStorage.getItem('user')) {
        alert('로그인이 필요합니다.');
        return;
      }

      // 낙관적 업데이트를 위한 새로운 상태 계산
      const newType = optimisticComment.reaction.userReaction === type ? null : type;
      const newReaction = {
        ...optimisticComment.reaction,
        userReaction: newType,
        likeCount:
          optimisticComment.reaction.likeCount +
          (type === 'like'
            ? newType === null
              ? -1
              : 1
            : optimisticComment.reaction.userReaction === 'like'
              ? -1
              : 0),
        dislikeCount:
          optimisticComment.reaction.dislikeCount +
          (type === 'dislike'
            ? newType === null
              ? -1
              : 1
            : optimisticComment.reaction.userReaction === 'dislike'
              ? -1
              : 0),
      };

      // 낙관적 업데이트 적용
      setOptimisticComment((prev) => ({
        ...prev,
        reaction: newReaction,
      }));

      await requestToggleCommentReaction(comment.id, newType);
    } catch (error) {
      setOptimisticComment(comment);
      console.error('댓글 반응 업데이트 실패:', error);
      alert('댓글 반응 업데이트에 실패했습니다.');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditContent(comment.content);
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
    setEditContent(comment.content);
  };

  const handleSubmitEdit = async () => {
    try {
      if (!editContent.trim()) {
        alert('내용을 입력해주세요.');
        return;
      }

      await requestUpdateComment(comment.id, editContent);
      setIsEditing(false);
      onRefresh?.();
    } catch (error) {
      console.error('댓글 수정 실패:', error);
      alert('댓글 수정에 실패했습니다.');
    }
  };

  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm('정말로 이 댓글을 삭제하시겠습니까?');
      if (!confirmDelete) return;

      await requestDeleteComment(comment.id);
      setIsMenuOpen(false);
      onRefresh?.();
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
      alert('댓글 삭제에 실패했습니다.');
    }
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

        {/* 점 세 개 버튼 + 수정 or 삭제 */}
        <div className="relative">
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
        <ReplyInput
          replyComment={replyComment}
          handleChangeReply={handleChangeReply}
          handleSubmitReply={handleSubmitReply}
          episodeId={episodeId}
          parentId={comment.id}
          onReplySuccess={onRefresh}
        />
      )}
    </div>
  );
};

export default CommentCard;
