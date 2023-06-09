export {Comment} from './Comment'

export interface Post {
  id?: number;//? sign means that it is Optional
  title: string;
  caption: string;
  location: string;
  image?: File;
  likes?: number;
  userLike?: string[];
  comments?: Comment[];
  username?: string;
}
