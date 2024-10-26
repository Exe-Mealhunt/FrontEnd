import { Author } from "./author.type";

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
