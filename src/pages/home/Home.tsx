import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import type Categoria from "../../models/Categoria"
import type Plano from "../../models/Plano"
import { buscar } from "../../services/Service"

function Home() {
  const [planos, setPlanos] = useState<Plano[]>([])
  const [treinos, setTreinos] = useState<Categoria[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  async function fetchData() {
    try {
      await buscar("/planos", setPlanos)
      await buscar("/categorias-treino", setTreinos)
    } catch (error) {
      console.error("Erro ao buscar dados:", error)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="max-w-6xl mx-auto">
      {/* Título */}
      <h1 className="text-4xl font-bold text-center mb-4 text-foreground tracking-tight">
        FitTrack
      </h1>

      <p className="text-center text-muted-foreground mb-10">
        Plataforma de gerenciamento de planos e treinos fitness.
      </p>

      {/* Cards Resumo */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {/* Usando bg-card e border-border para seguir o tema */}
        <div className="bg-card text-card-foreground rounded-xl p-6 border border-border transition-all hover:border-primary/50">
          <h2 className="text-xl font-semibold mb-2">Treinos Cadastrados</h2>
          {loading ? (
            <p className="text-muted-foreground">Carregando...</p>
          ) : (
            <p className="text-4xl font-bold text-primary">
              {planos.length}
            </p>
          )}
        </div>

        <div className="bg-card text-card-foreground rounded-xl p-6 border border-border transition-all hover:border-primary/50">
          <h2 className="text-xl font-semibold mb-2">Categorias</h2>
          {loading ? (
            <p className="text-muted-foreground">Carregando...</p>
          ) : (
            <p className="text-4xl font-bold text-primary">
              {treinos.length}
            </p>
          )}
        </div>
      </div>

      {/* Ações principais */}
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        <Link to="/categorias" className="w-full md:w-auto">
          {/* Botões usando bg-primary (verde) */}
          <button className="w-full bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
            Gerenciar Categorias
          </button>
        </Link>

        <Link to="/treinos" className="w-full md:w-auto">
          <button className="w-full bg-secondary text-secondary-foreground border border-border px-8 py-3 rounded-lg font-medium hover:bg-secondary/80 transition-colors">
            Gerenciar Treinos
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home