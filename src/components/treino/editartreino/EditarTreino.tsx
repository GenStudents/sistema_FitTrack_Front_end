import { useNavigate } from "react-router-dom"
import FormTreino from "../formtreino/FormTreino"
import { X } from "lucide-react"

export default function EditarTreino() {
  const navigate = useNavigate()

  return (
    /* Container Principal */ 
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      
      {/* CARD DO MODAL: */}
      <div className="bg-[#0c0c0e] border border-zinc-800 w-full max-w-lg rounded-2xl shadow-2xl relative">
        
        {/* BOTÃO DE FECHAR */}
        <button 
          onClick={() => navigate("/treinos")}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors p-1"
        >
          <X size={20} />
        </button>

        <div className="p-8">

            {/* TÍTULO E SUBTÍTULO */}
          <h2 className="text-xl font-bold text-white mb-2">Editar Plano de Treino</h2>
          <p className="text-zinc-400 text-sm mb-8">Altere as informações abaixo.</p>
          
          {/* COMPONENTE DE FORMULÁRIO REUTILIZÁVEL */}
          <FormTreino onClose={() => navigate("/treinos")} />
        </div>
      </div>
    </div>
  )
}