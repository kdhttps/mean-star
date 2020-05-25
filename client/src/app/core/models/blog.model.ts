export interface Blog {
  _id: string;
  title: string;
  content: string;
  status: string;
  publisher: {name: string, email: string};
  likes: [string];
  publishedAt: Date;
}
