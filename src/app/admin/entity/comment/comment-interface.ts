export interface CommentInterface {
  id: number;
  body: string;
  userName: string;
  entity: string;
  row: number;
  date: {
    timezone: { name: string; },
    timestamp: number;
  };
  lastEdit: Date;
  spacial: boolean;
}
