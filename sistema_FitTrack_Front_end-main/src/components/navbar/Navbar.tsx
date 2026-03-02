import { Link } from "react-router-dom"

function Navbar() {
return (
  <>

    <div className='w-full flex justify-center py-4
    bg-indigo-900 text-white'>

      <div className="container flex justify-between text-1g mx-8">
      <Link to='/home' className="text-2x1 font-bold">FitTrack</Link>

        <div className='flex gap-4'>
          <Link to='/treinos' className='hover:underline'>Treinos</Link>
          <Link to='/cadastrartreino' className='hover:underline'>Cadastrar Treinos</Link>
          <Link to='/planos' className='hover:underline'>Planos</Link>
          <Link to='/cadastrarplano' className='hover:underline'>Cadastrar Planos</Link>
        </div>
      
      </div>
    </div>

  </>
)

}

export default Navbar