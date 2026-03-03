import type Plano from "./Plano";

export default interface Categoria {
  id: number;
  descricao: string;
  planos?: Plano[] | null;
}