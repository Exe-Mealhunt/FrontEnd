import { Author } from "./author.type";
import { Comment } from "./comment.type";

export type Blog = {
  id?: number;
  author: Author;
  title: string;
  imgUrl: string;
  content?: string;
  rating?: number;
  createdAt: string;
  comments?: Comment[];
};
