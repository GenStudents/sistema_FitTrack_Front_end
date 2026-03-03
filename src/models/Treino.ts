export interface Treino {
  id?: number
  nome: string
  duracao: number
  nivel: "iniciante" | "intermediario" | "avancado"
  usuario: {
    id: number
    nome?: string
  }
  categoriaTreino: {
    id: number
    nome?: string
  }
}