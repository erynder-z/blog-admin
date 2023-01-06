export interface IComment {
  _id: string;
  parentPost: string;
  author: string;
  text: string;
  timestamp: Date;
}
