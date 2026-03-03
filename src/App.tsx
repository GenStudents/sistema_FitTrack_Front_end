import { BrowserRouter, Routes, Route } from "react-router-dom";

import Categoria from "./pages/categoria/Categoria";
import Navbar from "./components/navbar/Navbar";
import DeletarPlano from "./components/categoria-planos/deletarplano/DeletarPlano";
import FormPlano from "./components/categoria-planos/formplano/FormPlano";
import ListaPlanos from "./components/categoria-planos/listaplanos/ListaPlanos";
import Footer from "./components/footer/Footer";
import DeletarTreino from "./components/treino/deletartreino/DeletarTreino";
import FormTreino from "./components/treino/formtreino/FormTreino";
import ListaTreinos from "./components/treino/listatreinos/ListaTreinos";
import Home from "./pages/home/Home";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* HOME */}
        <Route path="/" element={<Categoria />} />


  return (
    <>
      <BrowserRouter>
        <Navbar/>
        
        <div className="min-h-[80vh]">

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path='/home' element={<Home/>} />
          <Route path="*" element={<Home />} />

          <Route path="/planos" element={<ListaPlanos />} />
          <Route path="/cadastrarplano" element={<FormPlano />} />
          <Route path="/editarplanos/:id" element={<FormPlano />} />
          <Route path="/deletarplanos/:id" element={<DeletarPlano />} />

          <Route path="/treinos" element={<ListaTreinos />} />
          <Route path="/cadastrartreino" element={<FormTreino />} />
          <Route path="/editartreino/:id" element={<FormTreino />} />
          <Route path="/deletartreino/:id" element={<DeletarTreino />} />
          <Route path="/categorias" element={<Categoria />} />

        </Routes>
        
        </div>

          <Footer/>
      </BrowserRouter>

      
    </>
  )


      </Routes>

    </BrowserRouter>
  );
}

export default App;