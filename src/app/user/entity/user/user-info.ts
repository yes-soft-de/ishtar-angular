export interface UserInfo {
  id: number;
  email: string;
  firsttName: string;
  image?: string;
  createdAt: string;
  roles: string[];
  password: string;
  salt: string;
  username: string;
}
