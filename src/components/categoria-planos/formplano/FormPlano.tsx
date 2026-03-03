import { useEffect, useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Categoria from "../../../models/Categoria";
import type Plano from "../../../models/Plano";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import type Usuario from "../../../models/Usuario";

function FormPlano() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false)

  // const [planos, setPlanos] = useState<Plano[]>([])
  const [plano, setplano] = useState<Plano>({ id: 0, nome: '', duracao: 0, nivel: "" })

  const [categoria, setCategoria] = useState<Categoria>({} as Categoria)
  const [categorias, setCategorias] = useState<Categoria[]>([])

  const [usuario, setUsuario] = useState<Usuario>({
    id: 3,
    altura: 0,
    peso: 0,
    foto: '',
    nome: '',
    usuario: ''
  })

  const { id } = useParams<{ id: string }>()

  const carregandoPlanos = plano.nome === ""

  function retornar() {
    navigate('/planos')
  }

  async function buscarPlanoPorId(id: string) {
    try {
      await buscar(`/planos/${id}`, setplano)
      alert("Plano encontrado com sucesso")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.toString().includes('401'))
        alert("Plano não encontrado")
    }
  }

  async function buscarCategoriaPorId(id: string) {
    try {
      await buscar(`/categorias-treino/${id}`, setCategoria)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.toString().includes('401'))
        alert("Plano não encontrado")
    }
  }

  async function buscarCategorias() {
    try {
      await buscar(`/categorias-treino`, setCategorias)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error)
    }
  }

  useEffect(() => {
    buscarCategorias()
  }, [])

  async function gerarNovoPlano(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    if (id !== undefined) {
      try {
        await atualizar(`/planos`, plano, setplano)
        alert("Plano atualizado com sucesso")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.toString().includes('401'))
          alert('Plano não encontrado')
      }
    } else {
      try {
        await cadastrar(`/planos`, plano, setplano)
        alert("Plano cadastrado com sucesso")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.toString().includes('401'))
          alert('Plano não cadastrado')
      }
    }
    setIsLoading(false)
    retornar()
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setplano({
      ...plano,
      [e.target.name]: e.target.value,
      categoriaTreino: categoria,
      usuario: usuario
    })
  }

  return (
    <>
      <div className="container flex flex-col mx-auto items-center ">
        <h1 className="text-4xl text-start my-8"> {id !== undefined ? "editar plano" : "Novo plano de treino"}</h1>

        <form className="flex flex-col w-1/2 gap-4"
          onSubmit={gerarNovoPlano}>

          <div className="flex flex-col gap-2">
            <label htmlFor="nome">Nome do Treino :</label>
            <input
              type="text"
              placeholder="ex: Treino Full Body"
              name="nome"
              value={plano.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              required
              className="border-2 border-[#181a1c] rounded p-2"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="nome">Duração : </label>
            <input
              type="text"
              placeholder="ex: 60"
              name="duracao"
              value={plano.duracao}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              required
              className="border-2 border-[#181a1c] rounded p-2"
            />
          </div>

          <div className="flex flex-col gap-2" >
            <label htmlFor="nivel">Nível :</label>
            <select name="nivel" id="nivel" className="border-2 p-2 border-[#181a1c] rounded"
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}>
              <option value="" selected disabled>Selecione um nível</option>
              <>
                <option> Iniciante</option>
                <option> Intermediario</option>
                <option> Avançado</option>
              </>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="categoria">Categoria:</label>
            <select name="nivel" id="nivel" className="border-2 p-2 border-[#181a1c] rounded"
              onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}>
              <option value="" selected disabled>Selecione uma Categoria</option>
              <>
                {categorias.map(categoria => (<option value={categoria.id}> {categoria.descricao}</option>))}
              </>
            </select>
          </div>

          <button type="submit" className="rounded disabled:bg-slate-500 bg-[#181a1c]" disabled={carregandoPlanos}>
            {isLoading ? <ClipLoader color="#ffffff" size={24} /> : <span>{id !== undefined ? 'Atualizar' : "Cadastrar"}</span>}
          </button>

        </form>
      </div>
    </>
  )

}
export default FormPlano