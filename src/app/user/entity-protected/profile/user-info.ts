export interface UserInfo {
  username?: string;
  id?: number;
  salt?: string;
  password?: string;
  roles?: [string];
  email?: string;
  fullName?: string;
  phone?: string;
  createdBy?: string;
  createDate?: string;
  updatedBy?: string;
  updateDate?: string;
  birthDate?: string;
  image?: string;
}
