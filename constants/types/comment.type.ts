export type Comment = {
  id?: number;
  userId: number;
  replyToId: number;
  postId: number;
  content: string;
  rating?: number;
  createdAt?: string;
};
