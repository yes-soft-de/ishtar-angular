export interface ClientInterface {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
  roll: ['ROLE_USER'];
  username: string;
  password?: string;
  email: string;
  salt?: string;
  birthDate: Date;
  phone: number;
  createDate: Date;
  createdBy: string;
  updateDate: Date;
  updatedBy: string;
}
