import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {api} from "../../services/api"

function Home() {
  const [totalPlanos, setTotalPlanos] = useState<number>(0)
  const [totalTreinos, setTotalTreinos] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const planos = await api.get("/planos")
        const treinos = await api.get("/treinos")

        setTotalPlanos(planos.data.length)
        setTotalTreinos(treinos.data.length)
      } catch (error) {
        console.error("Erro ao buscar dados:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="px-6 py-10 max-w-6xl mx-auto">
      {/* Título */}
      <h1 className="text-4xl font-bold text-center mb-4">
        FitTrack
      </h1>

      <p className="text-center text-gray-600 mb-10">
        Plataforma de gerenciamento de planos e treinos fitness.
      </p>

      {/* Cards Resumo */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white shadow-md rounded-xl p-6 border">
          <h2 className="text-xl font-semibold mb-2">Planos Cadastrados</h2>
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <p className="text-3xl font-bold text-blue-600">
              {totalPlanos}
            </p>
          )}
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 border">
          <h2 className="text-xl font-semibold mb-2">Treinos Cadastrados</h2>
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <p className="text-3xl font-bold text-green-600">
              {totalTreinos}
            </p>
          )}
        </div>
      </div>

      {/* Ações principais */}
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        <Link to="/planos">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Gerenciar Planos
          </button>
        </Link>

        <Link to="/treinos">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
            Gerenciar Treinos
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home