import { Clock, User, LayoutGrid, Pencil, Trash2 } from "lucide-react"
import type { Treino } from "../../../models/Treino"

interface CardTreinoProps {
  treino: Treino
  onEdit: () => void
  onDelete: () => void
}

// Cores da badge por nível
const nivelColors: Record<string, string> = {
  iniciante: "bg-emerald-600/20 text-emerald-400",
  intermediario: "bg-yellow-500/20 text-yellow-400",
  avancado: "bg-red-600/20 text-red-400",
}

// Labels formatadas
const nivelLabels: Record<string, string> = {
  iniciante: "Iniciante",
  intermediario: "Intermediário",
  avancado: "Avançado",
}

export default function CardTreino({
  treino,
  onEdit,
  onDelete,
}: CardTreinoProps) {
  return (
    <div className="group flex flex-col bg-zinc-900 border border-zinc-800 rounded-xl p-6 transition hover:border-emerald-600/40 hover:shadow-lg hover:shadow-emerald-600/10">

      {/* Cabeçalho */}
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-white">
          {treino.nome}
        </h3>

        {/* Badge nível */}
        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${
            nivelColors[treino.nivel] || "bg-zinc-700 text-zinc-300"
          }`}
        >
          {nivelLabels[treino.nivel] || treino.nivel}
        </span>
      </div>

      {/* Informações */}
      <div className="mt-4 flex flex-col gap-2 text-sm text-zinc-400">

        <div className="flex items-center gap-2">
          <Clock size={16} />
          <span>{treino.duracao} minutos</span>
        </div>

        <div className="flex items-center gap-2">
          <User size={16} />
          <span>{treino.usuario?.nome}</span>
        </div>

        <div className="flex items-center gap-2">
          <LayoutGrid size={16} />
          <span>{treino.categoriaTreino?.nome}</span>
        </div>

      </div>

      {/* Ações */}
      <div className="mt-5 flex gap-3 border-t border-zinc-800 pt-4 opacity-0 transition-opacity group-hover:opacity-100">

        <button
          onClick={onEdit}
          className="flex items-center gap-1 text-sm text-yellow-400 hover:text-yellow-300 transition"
        >
          <Pencil size={15} />
          Editar
        </button>

        <button
          onClick={onDelete}
          className="flex items-center gap-1 text-sm text-red-500 hover:text-red-400 transition"
        >
          <Trash2 size={15} />
          Excluir
        </button>

      </div>
    </div>
  )
}