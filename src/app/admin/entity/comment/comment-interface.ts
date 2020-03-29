export interface CommentInterface {
  id: number;
  body: string;
  username: string;
  entity: string;
  row: number;
  date: {
    timezone: { name: string; },
    timestamp: number;
  };
  lastEdit: {
    timezone: { name: string; },
    timestamp: number;
  };
  spacial: boolean;
}
