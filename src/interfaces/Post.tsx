import { IComment } from './Comment';
import { ITag } from './Tag';

export interface IPost {
  _id: string;
  author: {
    username: string;
    _id: string;
  };
  title: string;
  text: string;
  timestamp: Date;
  image: {
    data: Buffer;
    contentType: string;
  };
  tags: ITag[];
  comments: IComment[];
}
