import { useEffect, useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Categoria from "../../../models/Categoria";
import type Plano from "../../../models/Plano";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import type Usuario from "../../../models/Usuario";

function FormPlano() {

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [plano, setPlano] = useState<Plano>({
    id: 0,
    nome: '',
    duracao: 0,
    nivel: ""
  });

  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [usuario] = useState<Usuario>({
    id: 3,
    altura: 0,
    peso: 0,
    foto: '',
    nome: '',
    usuario: ''
  });

  const carregandoPlanos = plano.nome === "";

  function retornar() {
    navigate('/planos');
  }

  async function buscarPlanoPorId(id: string) {
    try {
      await buscar(`/planos/${id}`, setPlano);
      alert("Plano encontrado com sucesso");
    } catch (error: any) {
      if (error.toString().includes('401'))
        alert("Plano não encontrado");
    }
  }

  async function buscarCategoriaPorId(id: string) {
    try {
      await buscar(`/categorias-treino/${id}`, setCategoria);
    } catch (error: any) {
      if (error.toString().includes('401'))
        alert("Categoria não encontrada");
    }
  }

  async function buscarCategorias() {
    try {
      await buscar(`/categorias-treino`, setCategorias);
    } catch (error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    buscarCategorias();
    if (id !== undefined) {
      buscarPlanoPorId(id);
    }
  }, [id]);

  async function gerarNovoPlano(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const planoCompleto = {
      ...plano,
      categoriaTreino: categoria,
      usuario: usuario
    };

    if (id !== undefined) {
      try {
        await atualizar(`/planos`, planoCompleto, setPlano);
        alert("Plano atualizado com sucesso");
      } catch (error: any) {
        if (error.toString().includes('401'))
          alert('Plano não encontrado');
      }
    } else {
      try {
        await cadastrar(`/planos`, planoCompleto, setPlano);
        alert("Plano cadastrado com sucesso");
      } catch (error: any) {
        if (error.toString().includes('401'))
          alert('Plano não cadastrado');
      }
    }

    setIsLoading(false);
    retornar();
  }

  // 🔥 FUNÇÃO CORRIGIDA
  function atualizarEstado(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setPlano({
      ...plano,
      [name]: name === "duracao" ? Number(value) : value
    });
  }

  return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-start my-8">
        {id !== undefined ? "Editar plano" : "Novo plano de treino"}
      </h1>

      <form
        className="flex flex-col w-1/2 gap-4"
        onSubmit={gerarNovoPlano}
      >

        <div className="flex flex-col gap-2">
          <label htmlFor="nome">Nome do Treino :</label>
          <input
            type="text"
            placeholder="ex: Treino Full Body"
            name="nome"
            value={plano.nome}
            onChange={atualizarEstado}
            required
            className="border-2 border-[#181a1c] rounded p-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="duracao">Duração :</label>
          <input
            type="number"
            placeholder="ex: 60"
            name="duracao"
            value={plano.duracao}
            onChange={atualizarEstado}
            required
            className="border-2 border-[#181a1c] rounded p-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="nivel">Nível :</label>
          <select
            name="nivel"
            value={plano.nivel}
            onChange={atualizarEstado}
            required
            className="border-2 border-[#181a1c] rounded p-2"
          >
            <option value="" disabled>Selecione um nível</option>
            <option value="Iniciante">Iniciante</option>
            <option value="Intermediario">Intermediario</option>
            <option value="Avançado">Avançado</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="categoria">Categoria:</label>
          <select
            className="border-2 p-2 border-[#181a1c] rounded"
            onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
            required
          >
            <option value="" disabled>Selecione uma Categoria</option>
            {categorias.map(categoria => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.descricao}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="rounded disabled:bg-slate-500 bg-[#181a1c]"
          disabled={carregandoPlanos}
        >
          {isLoading
            ? <ClipLoader color="#ffffff" size={24} />
            : <span>{id !== undefined ? 'Atualizar' : "Cadastrar"}</span>
          }
        </button>

      </form>
    </div>
  );
}

export default FormPlano;