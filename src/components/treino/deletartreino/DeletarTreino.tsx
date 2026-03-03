import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import type { Treino } from "../../../models/Treino"
import { buscar, deletar } from "../../../services/Service"
import { AlertTriangle, X } from "lucide-react"

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#121214] border border-zinc-800 w-full max-w-md rounded-2xl shadow-2xl relative overflow-hidden">

        {/* Botão de fechar (X) */}
        <button 
          onClick={() => navigate("/treinos")}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-8 flex flex-col items-center text-center">

          {/* Ícone de Alerta para feedback de erro/exclusão */}
          <div className="mb-4 p-3 bg-red-950/30 rounded-full border border-red-500/20 text-red-500">
            <AlertTriangle size={32} />
          </div>

          {/* Título do Card */}
          <h2 className="text-xl font-bold text-white mb-2">Excluir Plano</h2>

          <p className="text-zinc-400 text-sm mb-6">
            Tem certeza que deseja excluir o plano <span className="text-white font-medium">"{treino.nome}"</span>? 
            Esta ação não pode ser desfeita.
          </p>

        {/* Botões */}
        <div className="flex w-full gap-3">

          <button
            onClick={() => navigate("/treinos")}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
          >
            Cancelar
          </button>

          <button
            onClick={confirmarDelete}
            disabled={loading}
            className="flex-1 px-4 py-2.5 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            {loading ? "Excluindo..." : "Excluir"}
          </button>

        </div>
      </div>
    </div>
  </div>
  )
}