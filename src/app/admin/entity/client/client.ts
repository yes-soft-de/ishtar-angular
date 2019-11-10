export class Client {
  public id: number;
  public fullName: string;
  public image?: string;
  public roles: ['ROLE_ADMIN', 'ROLE_USER'];
  public username: string;
  public password?: string;
  public email: string;
  public birthDate: Date;
  public phone: number;
  public createDate: Date;
  public createdBy: string;
  public updateDate: Date;
  public updatedBy: string;
}
