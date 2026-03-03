import { useEffect, useState } from "react"
import type Plano from "../../../models/Plano"
import { buscar } from "../../../services/Service"
import CardPlano from "../cardplano/CardPlano"


function ListaPlanos() {

   const [isLoading,setLoading] = useState<boolean>(false)
   const [plano,setPlano] =useState<Plano[]>([])

   useEffect(()=>{
    buscarPlanos()
   },[plano.length])

   async function buscarPlanos() {
    try{
      setLoading(true)
      await buscar('/planos',setPlano)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(error:any){
      if(error.toString().includes('401'))
      alert("Erro ao procurar plano")
    }finally{
      setLoading(false)
    }
   }
  return (
    <>
       {isLoading}

      <div className="flex justify-center w-full my-5">
        <div className="container flex flex-col">
          {(!isLoading && plano.length === 0) && (
            <span className="text-3xl text-center my-8">
              Nenhum Plano foi encontrado!
            </span>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
            plano.map((plano) => (
              <CardPlano key={plano.id} planos={plano}/>
            ))
        }
          </div>
        </div>
      </div>
    </>
  )
}

export default ListaPlanos