export class Post {
  id?: number;
  title: string = '';
  content: string = '';
  postedBy: string = '';
  img: string = '';
  date?: Date;  // Opcional
  likeCount: number = 0;
  viewCount: number = 0;
  commentCount: number = 0;
  tags: string[] = [];
  comments?: Comment[];
}
