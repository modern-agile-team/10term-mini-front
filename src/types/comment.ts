// 댓글 작성자 정보
export interface CommentUser {
  userId: number;
  username: string;
  nickname: string;
}

export interface CommentReaction {
  likeCount: number;
  dislikeCount: number;
  userReaction: 'like' | 'dislike' | null;
}

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

export interface CommentContent {
  totalCount: number;
  comments: Comment[];
}

export interface NewCommentRequest {
  content: string;
  parentId: number | null;
}

export interface NewCommentResponse extends Omit<Comment, 'user' | 'reaction' | 'children'> {
  episodeId: number;
  userId: number;
}
