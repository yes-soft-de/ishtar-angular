export interface ArtistDetails {
  id: number;
  name: string;
  nationality: string;
  residence: string;
  artType: string;
  birthDate: {
    timezone: { name: string; },
    timestamp: number;
  };
  story: string;
  details: string;
  image?: string;
  path?: string;
  video?: null;
  Facebook: null;
  Instagram: null;
  Twitter: null;
  Linkedin: null;
}
