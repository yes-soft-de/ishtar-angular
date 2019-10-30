export class Artist {
  public id: number;
  public name: string;
  public nationality: string;
  public residence: string;
  public birthDate: {
    'timezone': object,
    'timestamp': number
  };
  public Facebook: string;
  public Instagram: string;
  public Linkedin: string;
  public Twitter: string;
  // tslint:disable-next-line:variable-name
  public video: string;
  public details: string;
  public story: string;
}
