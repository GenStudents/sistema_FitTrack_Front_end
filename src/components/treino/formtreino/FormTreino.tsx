import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import type { Treino } from "../../../models/Treino"
import { buscar, cadastrar, atualizar } from "../../../services/Service"

export default function FormTreino() {

  const navigate = useNavigate()
  const { id } = useParams()
  const editando = !!id
  const [treino, setTreino] = useState<Treino>({} as Treino)
  const [usuarios, setUsuarios] = useState<any[]>([])
  const [categorias, setCategorias] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // Executa quando a página carrega ou quando o id muda
  useEffect(() => {
    buscarUsuarios()
    buscarCategorias()

    // Se estiver editando, busca o treino pelo id
    if (editando) {
      buscarTreinoPorId()
    }
  }, [id])

  // Busca treino específico
  async function buscarTreinoPorId() {
    await buscar(`/treinos/${id}`, setTreino)
  }

  // Busca todos os usuários 
  async function buscarUsuarios() {
    await buscar("/usuarios", setUsuarios)
  }

  // Busca todas as categorias
  async function buscarCategorias() {
    await buscar("/categorias", setCategorias)
  }

  // Atualiza campos simples do treino (nome, duração, nível)
  function atualizarEstado(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setTreino({
      ...treino,
      [e.target.name]: e.target.value,
    })
  }

  // Função responsável por salvar (create ou update)
  async function salvar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault() // evita reload da página
    setLoading(true)

    // Se estiver editando → atualiza
    if (editando) {
      await atualizar(`/treinos`, treino, setTreino)
    } 
    // Se não → cria novo
    else {
      await cadastrar(`/treinos`, treino, setTreino)
    }

    setLoading(false)

    // Após salvar, redireciona para listagem
    navigate("/treinos")
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
      <div className="w-full max-w-xl p8">

      {/* Título dinâmico */}
      <h1 className="text-3xl font-bold mb-2">
        {editando ? "Editar Plano de Treino" : "Novo Plano de Treino"}
      </h1>

      {/* Subtítulo dinâmico */}
      <p className="text-zinc-400 mb-8">
        {editando
          ? "Atualize as informações do treino."
          : "Preencha os dados para criar um novo treino."}
      </p>

      {/* Formulário principal */}
      <form onSubmit={salvar} className="flex flex-col gap-6 max-w-xl">

        {/* Campo Nome */}
        <div className="flex flex-col gap-2">
          <label>Nome</label>
          <input
            type="text"
            name="nome"
            value={treino.nome || ""}
            onChange={atualizarEstado}
            className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-600 outline-none"
            required
          />
        </div>

        {/* Campo Duração */}
        <div className="flex flex-col gap-2">
          <label>Duração (min)</label>
          <input
            type="number"
            name="duracao"
            value={treino.duracao || ""}
            onChange={atualizarEstado}
            className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-600 outline-none"
            required
          />
        </div>

        {/* Select Nível */}
        <div className="flex flex-col gap-2">
          <label>Nível</label>
          <select
            name="nivel"
            value={treino.nivel || ""}
            onChange={atualizarEstado}
            className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-600 outline-none"
            required
          >
            <option value="">Selecione</option>
            <option value="iniciante">Iniciante</option>
            <option value="intermediario">Intermediário</option>
            <option value="avancado">Avançado</option>
          </select>
        </div>

        {/* Select Usuário */}
        <div className="flex flex-col gap-2">
          <label>Usuário</label>
          <select
            value={treino.usuario?.id || ""}
            onChange={(e) =>
              setTreino({
                ...treino,
                usuario: { id: Number(e.target.value) },
              })
            }
            className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-600 outline-none"
            required
          >
            <option value="">Selecione um usuário</option>
            {usuarios.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Select Categoria */}
        <div className="flex flex-col gap-2">
          <label>Categoria</label>
          <select
            value={treino.categoriaTreino?.id || ""}
            onChange={(e) =>
              setTreino({
                ...treino,
                categoriaTreino: { id: Number(e.target.value) },
              })
            }
            className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-600 outline-none"
            required
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Botões */}
        <div className="flex gap-4 mt-4">

          {/* Cancelar → volta para listagem */}
          <button
            type="button"
            onClick={() => navigate("/treinos")}
            className="px-4 py-2 border border-zinc-700 rounded-lg"
          >
            Cancelar
          </button>

          {/* Salvar */}
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition"
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>

        </div>
      </form>
      </div>
    </div>
  )
}