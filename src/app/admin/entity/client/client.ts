export class Client {
  public id: number;
  public firstName: string;
  public lastName: string;
  public image: string;
  public roll: ['ROLE_ADMIN', 'ROLE_USER'];
  public username: string;
  public password: string;
  public email: string;
  public salt: string;
  public birthDate: Date;
  public phone: number;
  public createDate: Date;
  public createdBy: string;
  public updateDate: Date;
  public updatedBy: string;
}
