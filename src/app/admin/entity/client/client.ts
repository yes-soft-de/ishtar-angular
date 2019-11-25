export class Client {
  public id: number;
  public fullName: string;
  public image?: string;
  public roles?: ['ROLE_ADMIN', 'ROLE_USER'];
  public username: string;
  public password?: string;
  public email: string;
  public birthDate: {
    timezone: { name: string; },
    timestamp: number;
  };
  public phone: number;
  public createDate?: {
    timezone: { name: string; },
    timestamp: number;
  };
  public createdBy?: string;
  public updateDate?: {
    timezone: { name: string; },
    timestamp: number;
  };
  public updatedBy?: string;
}
