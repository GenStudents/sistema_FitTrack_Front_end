import type Categoria from "../../../models/Categoria";
import { Pencil, Trash2 } from "lucide-react";

interface CardCategoriaProps {
  categoria: Categoria;
  onEditar: (categoria: Categoria) => void;
  onDeletar: (categoria: Categoria) => void;
}

function CardCategoria({
  categoria,
  onEditar,
  onDeletar,
}: CardCategoriaProps) {
  return (
    <div
      className="
        bg-[#0B0F14]
        border border-zinc-800
        rounded-2xl
        px-4 py-4
        flex items-center justify-between
        hover:border-emerald-500
        transition-all
      "
    >
      {/* esquerda */}
      <div className="flex items-center gap-3">
        <span
          className="
            bg-emerald-900/40
            text-emerald-400
            text-sm font-bold
            px-3 py-1
            rounded-full
          "
        >
          #{categoria.id}
        </span>

        <p className="text-white text-xl font-semibold">
          {categoria.descricao}
        </p>
      </div>

      {/* direita */}
      <div className="flex gap-3 text-zinc-400">
        <button onClick={() => onEditar(categoria)}>
          <Pencil
            size={18}
            className="hover:text-emerald-400 transition"
          />
        </button>

        <button onClick={() => onDeletar(categoria)}>
          <Trash2
            size={18}
            className="hover:text-red-400 transition"
          />
        </button>
      </div>
    </div>
  );
}

export default CardCategoria;