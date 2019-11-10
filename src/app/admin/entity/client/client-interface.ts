export interface ClientInterface {
  id: number;
  fullName: string;
  image?: string;
  roles?: ['ROLE_ADMIN', 'ROLE_USER'];
  username: string;
  password?: string;
  email: string;
  // birthDate: {timestamp: number};
  birthDate: Date;
  phone: number;
  createDate?: Date;
  createdBy?: string;
  updateDate?: Date;
  updatedBy?: string;
}
