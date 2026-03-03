import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { AlertTriangle, X } from "lucide-react";

import type Categoria from "../../../models/Categoria";
import { deletar } from "../../../services/Service";

interface DeletarCategoriaProps {
  categoria: Categoria;
  fecharModal: () => void;
  atualizarLista: () => void;
}

function DeletarCategoria({
  categoria,
  fecharModal,
  atualizarLista,
}: DeletarCategoriaProps) {

  const [isLoading, setIsLoading] = useState(false);

  async function deletarCategoria() {
    if (!categoria?.id) return;

    setIsLoading(true);

    try {
      // ✅ CORREÇÃO AQUI
      await deletar(`/categorias-treino/${categoria.id}`);

      atualizarLista();
      fecharModal();

    } catch (error) {
      console.error("Erro ao deletar categoria", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="
        w-full max-w-md
        bg-[#0B0F14]
        border border-zinc-800
        rounded-2xl
        p-6
        relative
      ">

        <button
          onClick={fecharModal}
          className="absolute right-4 top-4 text-zinc-400 hover:text-white"
          type="button"
        >
          <X size={18} />
        </button>

        <div className="flex justify-center mb-4">
          <div className="bg-red-500/20 p-3 rounded-full">
            <AlertTriangle className="text-red-500" size={24} />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-white mb-2">
          Excluir Categoria
        </h1>

        <p className="text-center text-zinc-400 mb-6">
          Tem certeza que deseja excluir a categoria{" "}
          <span className="text-white font-semibold">
            "{categoria?.descricao}"
          </span>
          ?
          <br />
          Esta ação não pode ser desfeita.
        </p>

        <div className="flex justify-end gap-3">

          <button
            onClick={fecharModal}
            type="button"
            className="
              px-4 py-2
              rounded-lg
              border border-zinc-700
              text-zinc-300
              hover:bg-zinc-800
            "
          >
            Cancelar
          </button>

          <button
            onClick={deletarCategoria}
            type="button"
            disabled={isLoading}
            className="
              px-4 py-2
              rounded-lg
              bg-red-600
              hover:bg-red-700
              text-white
              min-w-[90px]
              flex justify-center items-center
              disabled:opacity-60
            "
          >
            {isLoading
              ? <ClipLoader color="#fff" size={20} />
              : "Excluir"}
          </button>

        </div>
      </div>
    </div>
  );
}

export default DeletarCategoria;