export interface CommentsEntity {
  comment: string;
  date: {
    timezone: { name: string; },
    timestamp: number;
  };
  spacial: boolean;
  userName: string;
  userImage: string;
  id: number;
  body: string;
}

