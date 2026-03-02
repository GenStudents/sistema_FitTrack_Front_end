import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'

import DeletarTreino from './components/treino/deletartreino/DeletarTreino'
import FormTreino from './components/treino/formtreino/FormTreino'
import ListaTreinos from './components/treino/listatreinos/ListaTreinos'

import DeletarPlano from './components/categoria-planos/deletarplano/DeletarPlano'
import FormPlano from './components/categoria-planos/formplano/FormPlano'
import ListaPlanos from './components/categoria-planos/listaplanos/ListaPlanos'

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        
        <div className="min-h-[80vh]">

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path='/home' element={<Home/>} />

          <Route path="/planos" element={<ListaPlanos />} />
          <Route path="/cadastrarplano" element={<FormPlano />} />
          <Route path="/editarplanos/:id" element={<FormPlano />} />
          <Route path="/deletarplanos/:id" element={<DeletarPlano />} />

          <Route path="/treinos" element={<ListaTreinos />} />
          <Route path="/cadastrartreino" element={<FormTreino />} />
          <Route path="/editartreino/:id" element={<FormTreino />} />
          <Route path="/deletartreino/:id" element={<DeletarTreino />} />

        </Routes>
        
        </div>

          <Footer/>
      </BrowserRouter>

      
    </>
  )
}



export default App
