export interface Treino {
  id?: number;
  nome: string;
  duracao: number;
  nivel: "Iniciante" | "Intermediario" | "Avancado"; 
  usuario: {
    id: number;
    nome?: string;
  };
  categoriaTreino: {
    id: number;
    descricao?: string; 
  };
}