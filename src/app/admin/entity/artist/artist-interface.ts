export interface ArtistInterface {
  id: number;
  name: string;
  nationality: string;
  residence: string;
  birthDate: {timestamp: number};
  Facebook: string;
  Instagram: string;
  Linkedin: string;
  Twitter: string;
  path: string;
  video?: string;
  image?: string;
  details: string;
  story: string;
  artType: string;
}
