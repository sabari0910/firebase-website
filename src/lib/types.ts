export type User = {
  id: string;
  name: string;
  avatarUrl?: string;
};

export type ImagePost = {
  id: string;
  imageUrl: string;
  name:string;
  tags: string[];
  userId: string;
  createdAt: Date;
  likes: number;
};
