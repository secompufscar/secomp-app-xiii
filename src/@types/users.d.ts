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
  rank?: number;
};

interface Login {
  email: string;
  senha: string;
};

interface SignUp {
  nome: string;
  email: string;
  senha: string;
};

interface SignupResponse {
  message: string;
  emailEnviado: boolean;
};

interface UpdateProfile {
  nome?: string;
  email?: string;
};
