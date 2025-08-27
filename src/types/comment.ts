// 댓글 작성자 정보
export interface CommentUser {
  userId: number;
  username: string;
  nickname: string;
}

// 좋아요/싫어요 정보
export interface CommentReaction {
  likeCount: number;
  dislikeCount: number;
  userReaction: 'like' | 'dislike' | null;
}

// 개별 댓글 정보 (대댓글 구조를 위해 재귀적으로 자신을 참조)
export interface Comment {
  id: number;
  content: string;
  parentId: number | null;
  createdAt: string;
  updatedAt: string;
  user: CommentUser;
  reaction: CommentReaction;
  children: Comment[];
}

// API 응답의 content 필드에 해당하는 타입
export interface CommentContent {
  totalCount: number;
  comments: Comment[];
}
