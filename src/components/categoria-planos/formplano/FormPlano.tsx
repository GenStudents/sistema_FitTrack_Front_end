import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Planos from "../../../models/Planos";


function FormPlano() {

  const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [planos, setPlanos] = useState<Planos[]>([])

    const [planos, setplanos] = useState<Planos>({ id: 0, descricao: '', })
    

    const { id } = useParams<{ id: string }>()


  return (
    <div className="container flex flex-col mx-auto items-center ">
        <h1 className="text-4xl text-start my-8"> Novo Plano De Treino</h1>
        <form className="flex flex-col w-1/2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="nome">Nome do Treino :</label>
            <input
             type="text"
             placeholder="ex: Treino Full Body"
             name="nomeTreino"
             required
             className="border-2 border-[#181a1c] rounded p-2"
             />
          </div>

          <div className="flex flex-col gap-2">
             <label htmlFor="nome">Duração : </label>  <input
             type="text"
             placeholder="ex: 60"
             name="duracaoTreino"
             required
             className="border-2 border-[#181a1c] rounded p-2"
             />
          </div>
            <div className="flex flex-col gap-2" >         
            
             <label htmlFor="nivel">Nível :</label>
             <select name="nivel" id="nivel" className="border-2 p-2 border-[#181a1c] rounded">
              <option value="" selected disabled>Selecione um nível</option>
              <>
                <option> Iniciante</option>  
                <option> Intermediario</option>  
                <option> Avançado</option>  
              </>
             </select>
             </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="categoria">Categoria:</label>
            <select name="nivel" id="nivel" className="border-2 p-2 border-[#181a1c] rounded">
              <option value="" selected disabled>Selecione uma Categoria</option>
              <>
                 <option> Hipertrofia</option>  
                <option> Emagrecimento</option>  
                <option> Cardio</option>  
                <option> Mobilidade</option>  
              </>
             </select>
          </div>
          <button type="submit" className="rounded disabled:bg-slate-500 bg-">
            Cadastrar
          </button>
        </form>
    </div>   
  )
}

export default FormPlano