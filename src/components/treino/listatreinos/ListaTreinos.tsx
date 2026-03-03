import { useEffect, useState } from "react"
import { Search, Plus, X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import type { Treino } from "../../../models/Treino"
import { buscar } from "../../../services/Service"
import CardTreino from "../cardtreino/CardTreino"
import FormTreino from "../formtreino/FormTreino"


export default function ListarTreinos() {

  const navigate = useNavigate()
  const [treinos, setTreinos] = useState<Treino[]>([])
  const [buscaNome, setBuscaNome] = useState("")
  const [nivelFiltro, setNivelFiltro] = useState("")
  const [isModalAberto, setIsModalAberto] = useState(false);

  // Função que busca todos os treinos
  async function buscarTreinos() {
    await buscar("/planos", setTreinos)
  }

  // Executa quando a tela carrega
  useEffect(() => {
    buscarTreinos()
  }, [])

  // Filtro da lista:
  // 1. Filtra pelo nome digitado
  // 2. Filtra pelo nível selecionado
  const treinosFiltrados = treinos
    .filter((t) =>
      t.nome.toLowerCase().includes(buscaNome.toLowerCase())
    )
    .filter((t) =>
      nivelFiltro ? t.nivel === nivelFiltro : true
    )

  return (
    <div className="p-8 min-h-screen bg-zinc-950 text-white">

      {/* header*/}
      <div className="flex justify-between items-start mb-8">
        
        {/* Bloco título + descrição */}
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-white">
            Planos de Treino
          </h1>

          <p className="text-zinc-400 text-sm">
            Crie e gerencie planos de treino personalizados.
          </p>
        </div>

        {/* Botão Novo Treino */}
        <button
          onClick={() => setIsModalAberto(true)} // Abre o modal ao clicar
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-black px-4 py-2 rounded-xl font-medium transition-all shadow-md hover:shadow-lg">
          <Plus size={18} strokeWidth={2.5} />
          Novo Treino
        </button>
      </div>

      {/* Busca e filtro */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">

        {/* Campo de busca */}
        <div className="flex items-center bg-zinc-900 px-4 py-2 rounded-lg w-full md:w-80 border border-zinc-800">
          <Search size={18} className="mr-2 text-zinc-400" />
          <input
            type="text"
            placeholder="Buscar por nome..."
            className="bg-transparent outline-none w-full text-sm"
            value={buscaNome}
            onChange={(e) => setBuscaNome(e.target.value)}
          />
        </div>

        {/* Filtro por nível */}
        <select
          className="bg-zinc-900 px-4 py-2 rounded-lg border border-zinc-800 text-sm"
          value={nivelFiltro}
          onChange={(e) => setNivelFiltro(e.target.value)}
        >
          <option value="">Todos os níveis</option>
          <option value="Iniciante">Iniciante</option>
          <option value="Intermediario">Intermediário</option>
          <option value="Avancado">Avançado</option>
        </select>
      </div>

      {/* Listagem */}

      {treinosFiltrados.length === 0 ? (
        <div className="text-center text-zinc-400 mt-20">
          Nenhum treino encontrado.
        </div>

      ) : (

        // Grid responsivo 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {treinosFiltrados.map((treino) => (

            //  componente separado
            <CardTreino
              key={treino.id}
              treino={treino}
              onEdit={() => navigate(`/editarTreino/${treino.id}`)}
              onDelete={() => navigate(`/deletarTreino/${treino.id}`)}
            />

          ))}

        </div>
      )}

      {/* MODAL DE CADASTRO */}
      {isModalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          
          {/* Container do Modal */}
          <div className="bg-[#0c0c0e] border border-zinc-800 w-full max-w-lg rounded-2xl shadow-2xl relative animate-in zoom-in-95 duration-200">
            
            {/* Header do Modal */}
            <button 
                onClick={() => setIsModalAberto(false)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors p-1"
              >
                <X size={20} />
              </button>

              <div className="p-8 max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold text-white mb-2">Novo Plano de Treino</h2>
                <p className="text-zinc-400 text-sm mb-8">Preencha os dados para criar um novo treino.</p>
        
        <FormTreino onClose={() => {
          setIsModalAberto(false);
        buscarTreinos(); // atualizar a lista sozinha
        }} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}