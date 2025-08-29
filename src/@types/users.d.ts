interface User {
  id: string;
  nome: string;
  email: string;
  tipo: string;
  qrCode: string;
  pushToken?: string;
  points: int;
  registrationStatus: int;
  currentEdition?: string;
}
