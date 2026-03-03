import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";

import type Categoria from "../../../models/Categoria";
import { buscar } from "../../../services/Service";

import CardCategoria from "../cardcategoria/CardCategoria";
import FormCategoria from "../formcategoria/FormCategoria";
import DeletarCategoria from "../deletarcategoria/DeletarCategoria";

function ListaCategoria() {

  const [isLoading, setIsLoading] = useState(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  // modais
  const [modalEditar, setModalEditar] = useState(false);
  const [modalDeletar, setModalDeletar] = useState(false);

  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState<Categoria | null>(null);

  // carregar lista só 1x
  useEffect(() => {
    buscarCategorias();
  }, []);

  async function buscarCategorias() {
    try {
      setIsLoading(true);

      await buscar(
        "/categorias-treino",
        setCategorias,
        {}
      );

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  // 🔥 NOVA CATEGORIA
  function abrirModalNovaCategoria() {
    setCategoriaSelecionada(null);
    setModalEditar(true);
  }

  // 🔥 EDITAR
  function abrirEditar(categoria: Categoria) {
    setCategoriaSelecionada(categoria);
    setModalEditar(true);
  }

  // 🔥 DELETAR
  function abrirDeletar(categoria: Categoria) {
    setCategoriaSelecionada(categoria);
    setModalDeletar(true);
  }

  // 🔥 FECHAR TODOS MODAIS
  function fecharModais() {
    setModalEditar(false);
    setModalDeletar(false);
    setCategoriaSelecionada(null);
    buscarCategorias();
  }

  return (
    <>

      {isLoading && (
        <div className="flex justify-center w-full my-8">
          <SyncLoader color="#10b981" size={12} />
        </div>
      )}

      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-white">
              Categorias de Treino
            </h1>

            <button
              onClick={abrirModalNovaCategoria}
              className="
                bg-emerald-500
                hover:bg-emerald-600
                text-black
                font-semibold
                px-5 py-2
                rounded-xl
                transition
              "
            >
              + Nova Categoria
            </button>
          </div>

          {!isLoading && categorias.length === 0 && (
            <span className="text-3xl text-center my-8 text-zinc-400">
              Nenhuma Categoria foi encontrada!
            </span>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {categorias.map((categoria) => (
              <CardCategoria
                key={categoria.id}
                categoria={categoria}
                onEditar={abrirEditar}
                onDeletar={abrirDeletar}
              />
            ))}

          </div>

        </div>
      </div>

      {/* MODAL EDITAR / NOVA */}
      {modalEditar && (
        <FormCategoria
          categoriaInicial={categoriaSelecionada}
          fecharModal={fecharModais}
        />
      )}

      {/* MODAL DELETAR */}
      {modalDeletar && categoriaSelecionada && (
        <DeletarCategoria
          categoria={categoriaSelecionada}
          fecharModal={fecharModais}
          atualizarLista={buscarCategorias}
        />
      )}

    </>
  );
}

export default ListaCategoria;