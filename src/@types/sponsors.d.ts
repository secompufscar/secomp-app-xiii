interface Sponsor {
  id?: string;
  name: string;
  logoUrl: undefined;
  description: string;
  starColor: string; // Diamante, Ouro ou Prata
  link: string;
  tags: string[];
};

interface UpdateSponsorData {
  name?: string;
  logoUrl?: string;
  description?: string;
  starColor?: string;
  link?: string;
};

interface CreateSponsorData {
  name: string
  logoUrl: string
  description: string
  starColor: string
  link: string
  tagIds?: string[]
};
