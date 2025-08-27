import { HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/react/24/solid';
import type { Comment } from '@/types/comment';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import ReplyCard from './ReplyCard';
import ReplyInput from './ReplyInput';

interface CommentCardProps {
  comment: Comment;
}

const CommentCard = ({ comment }: CommentCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [replyComment, setReplyComment] = useState('');

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
    setIsReplyOpen(false);
  };

  return (
    <div key={comment.id} className="pt-5">
      {/* 헤더 */}
      <div className="flex justify-between items-start">
        {/* 왼쪽: 기존 유저 정보 */}
        <div className="flex flex-col">
          <div className="text-base">
            <span>{comment.user.nickname}</span>
            <span>({maskUsername(comment.user.username)})</span>
          </div>
          <span className="text-gray-500 text-sm">
            {new Date(comment.createdAt).toLocaleString()}
          </span>
        </div>

        {/* 오른쪽: 점 세 개 버튼과 드롭다운 메뉴 */}
        <div className="relative">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <EllipsisVerticalIcon className="w-6 h-6 text-gray-500" />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-28 bg-white rounded-md shadow-lg z-10 border">
              <button
                onClick={() => {
                  console.log('수정 버튼 클릭');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                수정
              </button>
              <button
                onClick={() => {
                  console.log('삭제 버튼 클릭');
                  setIsMenuOpen(false);
                }}
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
        <p className="whitespace-pre-wrap">{comment.content}</p>
      </div>
      {/* 푸터 */}
      <div className="flex justify-between items-center my-4">
        {/* 답글 개수 표시 */}
        <button className="px-2 py-1 bg-gray-100" onClick={() => setIsReplyOpen(!isReplyOpen)}>
          답글 {comment.children.length}
        </button>
        <div className="flex items-center">
          <button className="flex items-center px-2 py-1 ml-4 bg-gray-100">
            <HandThumbUpIcon
              className={`w-4 h-4 ${
                comment.reaction.userReaction === 'like' ? 'text-blue-500' : 'text-gray-300'
              }`}
            />
            <span className="ml-2 text-sm">{comment.reaction.likeCount}</span>
          </button>
          <button className="flex items-center px-2 py-1 ml-4 bg-gray-100">
            <HandThumbDownIcon
              className={`w-4 h-4 ${
                comment.reaction.userReaction === 'dislike' ? 'text-red-500' : 'text-gray-300'
              }`}
            />
            <span className="ml-2 text-sm">{comment.reaction.dislikeCount}</span>
          </button>
        </div>
      </div>

      {/* 대댓글 리스트 */}
      {isReplyOpen &&
        comment.children.map((childComment) => (
          <ReplyCard
            key={childComment.id}
            childComment={childComment}
            maskUsername={maskUsername}
          />
        ))}

      {/* 대댓글 작성 폼 */}
      {isReplyOpen && (
        <ReplyInput
          replyComment={replyComment}
          handleChangeReply={handleChangeReply}
          handleSubmitReply={handleSubmitReply}
        />
      )}
    </div>
  );
};

export default CommentCard;
