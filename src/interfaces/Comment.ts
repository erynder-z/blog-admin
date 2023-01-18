export interface IComment {
  _id: string;
  parentArticle: string;
  author: string;
  text: string;
  timestamp: Date;
}
