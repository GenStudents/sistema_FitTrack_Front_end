import { BrowserRouter, Routes, Route } from "react-router-dom";

import Categoria from "./pages/categoria/Categoria";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* HOME */}
        <Route path="/" element={<Categoria />} />

        {/* CATEGORIAS */}
        <Route path="/categorias" element={<Categoria />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;