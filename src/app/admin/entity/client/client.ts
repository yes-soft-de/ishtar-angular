import {ClientInterface} from './client-interface';

export class Client {
  id?: number;
  fullName: string;
  image?: string;
  roles?: ['ROLE_ADMIN', 'ROLE_USER'];
  username: string;
  password?: string;
  email: string;
  birthDate: {
    timezone: { name: string; },
    timestamp: number;
  };
  phone: number;
  createDate?: {
    timezone: { name: string; },
    timestamp: number;
  };
  createdBy?: string;
  updateDate?: {
    timezone: { name: string; },
    timestamp: number;
  };
  updatedBy?: string;
}
