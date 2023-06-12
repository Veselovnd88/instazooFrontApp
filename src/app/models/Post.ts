import {ZooComment} from "./ZooComment";

export {ZooComment} from './ZooComment'

export interface Post {
  id?: number;//? sign means that it is Optional
  title: string;
  caption: string;
  location: string;
  image?: File;
  likes: number;
  likedUsers: string[];
  comments: ZooComment[];
  username?: string;
}
