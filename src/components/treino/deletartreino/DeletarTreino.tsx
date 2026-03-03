import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import type { Treino } from "../../../models/Treino"
import { buscar, deletar } from "../../../services/Service"

export default function DeletarTreino() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [treino, setTreino] = useState<Treino>({} as Treino)
  const [loading, setLoading] = useState(false)

  // Busca o treino para mostrar informações antes de deletar
  useEffect(() => {
    async function buscarTreino() {
      await buscar(`/planos/${id}`, setTreino)
    }

    if (id) {
      buscarTreino()
    }
  }, [id])

  // Função que confirma exclusão
  async function confirmarDelete() {
    setLoading(true)

    try {
      await deletar(`/planos/${id}`)
      navigate("/treinos")
    } catch (error) {
      console.error("Erro ao deletar o plano:", error)
      alert("Não foi possível deletar o plano de treino.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">

      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl w-full max-w-md">

        <h1 className="text-2xl font-bold mb-4 text-center">
          Deletar Plano de Treino
        </h1>

        <p className="text-zinc-400 text-center mb-6">
          Você tem certeza que deseja deletar o treino:
        </p>

        <div className="bg-zinc-800 p-4 rounded-lg text-center mb-6">
          <p className="font-semibold">{treino.nome}</p>
          <p className="text-sm text-zinc-400">
            {treino.duracao} minutos
          </p>
        </div>

        <div className="flex gap-4 justify-center">

          <button
            onClick={() => navigate("/treinos")}
            className="px-4 py-2 border border-zinc-700 rounded-lg"
          >
            Cancelar
          </button>

          <button
            onClick={confirmarDelete}
            disabled={loading}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
          >
            {loading ? "Deletando..." : "Confirmar"}
          </button>

        </div>
      </div>
    </div>
  )
}