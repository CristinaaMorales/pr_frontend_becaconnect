// models/comment.ts
export class Comment {
  id?: number;
  content: string = ''; 
  username?: string | null;
  userId?: number | null;
  createdAt?: Date;
}
