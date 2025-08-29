import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { requestCreateComment, requestGetComments } from '@/apis/comment';
import type { CommentContent, NewCommentRequest } from '@/types/comment';
import CommentCard from './CommentCard';
import useLocalStorage from '@/hooks/useLocalStorage';
import type { User } from '@/types/auth';
import useCommentInput from '@/hooks/useCommentInput';
import Spinner from './Spinner';

const CommentSection = ({ episodeId }: { episodeId: number }) => {
  const navigate = useNavigate();
  const [currentUser] = useLocalStorage<User>('user', {
    nickname: '',
    username: '',
  });

  const { commentInput, handleChange, resetInput } = useCommentInput('');
  const [commentData, setCommentData] = useState<CommentContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [openReplyIds, setOpenReplyIds] = useState<Set<number>>(new Set());

  const toggleReplySection = (commentId: number) => {
    setOpenReplyIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  const fetchComments = useCallback(async () => {
    if (!episodeId) {
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      const data = await requestGetComments(episodeId);

      // 로그인 상태 확인 후 reaction.userReaction 초기화
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      if (user) {
        data.comments.forEach((comment) => {
          comment.reaction.userReaction = comment.reaction.userReaction || null;
          comment.children.forEach((child) => {
            child.reaction.userReaction = child.reaction.userReaction || null;
          });
        });
      }

      setCommentData(data);
    } catch (err) {
      console.error('댓글 데이터를 불러오는 중 오류 발생:', err);
      setError('댓글을 불러오는 데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [episodeId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments, currentUser]);

  const handleTextareaClick = () => {
    if (!currentUser.username) {
      alert('로그인을 하신 후 이용해 주시길 바랍니다');
      navigate('/login');
    }
  };

  const handleSubmitComment = async () => {
    const trimmed = commentInput.trim();
    if (!trimmed) return;

    try {
      const newCommentData: NewCommentRequest = {
        content: trimmed,
        parentId: null,
      };

      await requestCreateComment(episodeId, newCommentData);

      alert('댓글이 성공적으로 등록되었습니다.');
      resetInput();

      fetchComments();
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      alert('댓글 작성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  if (isLoading) {
    return <Spinner message="댓글을 불러오는 중입니다..." />;
  }

  if (error) {
    return <div className="w-2-3 text-red-500">{error}</div>;
  }

  return (
    <div className="w-2/3">
      <div className="flex items-center">
        <span className="text-2xl">댓글</span>
        <span className="ml-1 text-2xl text-site-red font-bold">
          {commentData?.totalCount ?? 0}
        </span>
        <button onClick={fetchComments} className="h-6 w-6 rounded-full">
          <ArrowPathIcon className="h-5 w-5 ml-2 border rounded-full text-gray-400" />
        </button>
      </div>

      <div className="w-full h-[200px] mt-4 p-4 rounded-md border-2">
        {currentUser.username ? (
          <div>
            <span>{currentUser.nickname}</span>
            <span>({currentUser.username})</span>
          </div>
        ) : null}
        <div className="py-2">
          <textarea
            className="w-full h-[80px] resize-none rounded-md overflow-y-scroll focus:outline-none"
            placeholder={
              currentUser.username
                ? '댓글을 작성해주세요'
                : '로그인 한 사용자만 댓글을 작성할 수 있습니다'
            }
            value={commentInput}
            onChange={handleChange}
            onClick={handleTextareaClick}
          />
        </div>
        <div className="flex justify-end items-center text-gray-500">
          <span className={`${commentInput.length >= 500 ? 'text-site-red' : ''}`}>
            {commentInput.length}
          </span>
          /500
          <button
            className={`h-8 w-8 ml-3 rounded-full flex items-center justify-center ${commentInput ? 'bg-site-red' : 'bg-gray-300'}`}
            onClick={handleSubmitComment}
          >
            <PaperAirplaneIcon className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>

      <div className="mt-20">
        <span className="font-semibold">전체댓글</span>
        <hr className="mt-2" />

        {commentData?.comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            episodeId={episodeId}
            onRefresh={fetchComments}
            isReplyOpen={openReplyIds.has(comment.id)}
            onToggleReply={() => toggleReplySection(comment.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
