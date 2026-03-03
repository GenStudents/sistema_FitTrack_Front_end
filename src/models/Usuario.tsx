import type Plano from "./Plano";

export default interface Usuario {
  id: number;
  nome: string;
  usuario: string;
  foto: string;
  altura: number;
  peso: number;

  planos?: Plano[] | null;
}