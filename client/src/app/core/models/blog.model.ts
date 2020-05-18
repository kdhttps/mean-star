export interface Blog {
  _id: string;
  title: string;
  content: string;
  status: string;
  publisher: string;
  likes: [string];
  publishedAt: Date;
}
