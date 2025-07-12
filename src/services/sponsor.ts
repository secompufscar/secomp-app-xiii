import api from "./api";

export type UpdateSponsorData = Partial<Sponsor>;

// Busca e retorna a lista de todos os patrocinadores
export const getSponsors = async (): Promise<Sponsor[]> => {
  const response = await api.get('/sponsors');
  return response.data;
};

// Cria um novo patrocinador
export const createSponsor = async (sponsorData: Sponsor): Promise<Sponsor> => {
  const response = await api.post('/sponsors', sponsorData);
  return response.data;
};

// Atualiza um patrocinador existente
export const updateSponsor = async (id: string, sponsorData: UpdateSponsorData): Promise<Sponsor> => {
  const response = await api.patch(`/sponsors/${id}`, sponsorData);
  return response.data;
};

// Deleta um patrocinador
export const deleteSponsor = async (id: string): Promise<void> => {
  await api.delete(`/sponsors/${id}`);
};

// Vincula uma tag a um patrocinador
export const linkTagToSponsor = async (sponsorId: string, tagId: string): Promise<SponsorsOnTags> => {
  const response = await api.post(`/sponsors/${sponsorId}/tags`, { tagId });
  return response.data;
};

// Desvincula uma tag de um patrocinador
export const unlinkTagFromSponsor = async (sponsorId: string, tagId: string): Promise<void> => {
  await api.delete(`/sponsors/${sponsorId}/tags/${tagId}`);
};