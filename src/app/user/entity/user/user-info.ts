export interface UserInfo {
  id: number;
  email: string;
  firsttName: string;
  lastName?: string;
  createdAt: string;
  roles: string[];
  password: string;
  salt: string;
  userName: string;
}
