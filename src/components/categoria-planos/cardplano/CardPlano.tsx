import { Link } from "react-router-dom";


function CardPlanos() {

  return (
   <div className='border flex flex-col rounded-2xl overflow-hidden justify-between bg-[#0e0f12] '>
           
          <div className="flex items-center bg-[#0e0f12]  justify-between p-3">
            <h3 className='py-2 px-6 text-white font-bold '>
                Treino Full Body
            </h3>
            <span className="bg-[#0c2922] text-[#08c794] rounded px-5">Iniciante</span>
          </div>
            <p className='p-3  bg-[#0e0f12]  text-[#7c7d63]'>TimerIcons 60min</p>
            <p className='p-3  bg-[#0e0f12]  text-[#7c7d63]'>Usericon Carlos Dias</p>
            <p className='p-3  bg-[#0e0f12]  text-[#7c7d63]'>TreinoIcon Hipertrofia</p>
            
            <div className="flex">
                <Link to="" 
                    className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-800 
                        flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>

                <Link to=""  className='text-slate-100 bg-red-400 hover:bg-red-700 w-full 
                    flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
            </div>

        </div>
  )
}
export default CardPlanos