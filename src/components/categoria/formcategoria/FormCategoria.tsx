import {
  useState,
  type ChangeEvent,
  type FormEvent
} from "react";

import { ClipLoader } from "react-spinners";

import type Categoria from "../../../models/Categoria";
import { atualizar, cadastrar } from "../../../services/Service";

interface FormCategoriaProps {
  categoriaInicial?: Categoria | null;
  fecharModal: () => void;
}

function FormCategoria({
  categoriaInicial,
  fecharModal
}: FormCategoriaProps) {

  // ✅ estado inicial seguro
  const [categoria, setCategoria] = useState<Categoria>(
    categoriaInicial ?? {
      id: 0,
      descricao: ""
    }
  );

  const [isLoading, setIsLoading] = useState(false);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setCategoria({
      ...categoria,
      [name]: value,
    });
  }

  async function salvarCategoria(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {

      // ✅ EDITAR
      if (categoria.id && categoria.id !== 0) {
        await atualizar(
          "/categorias-treino",
          categoria,
          () => {}
        );
      }

      // ✅ NOVA CATEGORIA
      else {
        await cadastrar(
          "/categorias-treino",
          categoria,
          () => {}
        );
      }

    } catch (error) {
      console.error("Erro ao salvar categoria", error);
    }

    setIsLoading(false);
    fecharModal();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-zinc-900 rounded-2xl p-6 w-[500px]">

        <h1 className="text-3xl text-white text-center mb-6">
          {categoria.id && categoria.id !== 0
            ? "Editar Categoria"
            : "Nova Categoria"}
        </h1>

        <form
          className="flex flex-col gap-4"
          onSubmit={salvarCategoria}
        >

          <div className="flex flex-col gap-2">
            <label className="text-zinc-300">
              Descrição da Categoria
            </label>

            <input
              type="text"
              name="descricao"
              className="border border-zinc-700 bg-zinc-800 text-white rounded p-2"
              value={categoria.descricao}
              onChange={atualizarEstado}
              required
            />
          </div>

          <div className="flex gap-3 mt-2">

            <button
              type="button"
              onClick={fecharModal}
              className="w-full py-2 rounded bg-zinc-700 text-white hover:bg-zinc-600"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="w-full py-2 rounded bg-emerald-500 hover:bg-emerald-600 text-black font-semibold flex justify-center items-center"
            >
              {isLoading ? (
                <ClipLoader color="#000" size={20} />
              ) : (
                "Salvar"
              )}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default FormCategoria;