import type Usuario from "./Usuario";
import type Categoria from "./Categoria";

export default interface Plano {
  id: number;
  nome: string;
  duracao: number;
  nivel: string;

  usuario?: Usuario | null;
  categoriaTreino?: Categoria | null;
}