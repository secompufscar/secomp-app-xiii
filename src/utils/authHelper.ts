// Variável global que vai armazenar a função de logout
let globalSignOut: (() => Promise<void>) | null = null;

// Função para registrar a função de logout global
export const setGlobalSignOut = (fn: () => Promise<void>) => {
  globalSignOut = fn;
};

// Função para disparar o logout global
// Se houver uma função registrada em globalSignOut, ela será chamada
export const callGlobalSignOut = async () => {
  if (globalSignOut) await globalSignOut();
};