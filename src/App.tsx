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

import Categoria from './pages/categoria/Categoria'
import EditarTreino from './components/treino/editartreino/EditarTreino'

function App() {
  

  return (
    <>
    <BrowserRouter>
      {/* Container principal usando flexbox */}
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        
        {/* A Sidebar fica fixa na esquerda no Desktop */}
        <Navbar />
        
        {/* O conteúdo principal ocupa o resto da tela (flex-1) */}
        <main className="flex flex-col flex-1 lg:pl-[260px]">
          
          <div className="flex-1 p-6 lg:p-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/home' element={<Home />} />

              <Route path="/planos" element={<ListaPlanos />} />
              <Route path="/cadastrarplano" element={<FormPlano />} />
              <Route path="/editarplanos/:id" element={<FormPlano />} />
              <Route path="/deletarplanos/:id" element={<DeletarPlano />} />

              <Route path="/treinos" element={<ListaTreinos />} />
              <Route path="/cadastrartreino" element={<FormTreino onClose={() => {}}/>} />
              <Route path="/editartreino/:id" element={<EditarTreino />} />
              <Route path="/deletartreino/:id" element={<DeletarTreino />} />

              <Route path="/categorias" element={<Categoria />} />

            </Routes>
          </div>

          <Footer />
        </main>
        
      </div>
    </BrowserRouter>

      
    </>
  )
}



export default App
