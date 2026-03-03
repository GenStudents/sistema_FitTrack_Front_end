import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import type { Treino } from "../../../models/Treino"
import { buscar, cadastrar, atualizar } from "../../../services/Service"

// Interface para aceitar a função de fechar o modal
interface FormTreinoProps {
  onClose: () => void;
}

export default function FormTreino({ onClose }: FormTreinoProps) { // Recebendo onClose
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
    <div className="w-full text-white">
      <form onSubmit={salvar} className="flex flex-col gap-5">

        {/* Campo Nome */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-300">Nome</label>
          <input
            type="text"
            name="nome"
            placeholder="Ex: Treino Full Body"
            value={treino.nome || ""}
            onChange={atualizarEstado}
            className="bg-zinc-900 border border-emerald-500/30 rounded-lg px-4 py-2 focus:border-emerald-500 outline-none transition-all"
            required
          />
        </div>

        {/* Duração e Nível lado a lado */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-300">Duração (min)</label>
          <input
            type="number"
            name="duracao"
            value={treino.duracao || ""}
            onChange={atualizarEstado}
            className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 focus:border-emerald-500 outline-none transition-all"
            required
          />
        </div>

        {/* Select Nível */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-300">Nível</label>
          <select
            name="nivel"
            value={treino.nivel || ""}
            onChange={atualizarEstado}
            className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 focus:border-emerald-500 outline-none transition-all text-zinc-400"
            required
          >
            <option value="">Selecione</option>
            <option value="iniciante">Iniciante</option>
            <option value="intermediario">Intermediário</option>
            <option value="avancado">Avançado</option>
          </select>
        </div>
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
        <div className="flex justify-end gap-3 mt-4">

          {/* Cancelar → volta para listagem */}
          <button
            type="button"
            onClick={onClose} // isso aqui fecha o modal
            className="px-6 py-2 text-sm font-medium text-white border border-zinc-700 hover:bg-zinc-800 rounded-lg transition-colors"
          >
            Cancelar
          </button>

          {/* Salvar */}
          <button
            type="submit"
            className="px-6 py-2 text-sm font-medium bg-emerald-500 hover:bg-emerald-600 text-black rounded-lg transition-all"
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>

        </div>
      </form>
      </div>
  )
}