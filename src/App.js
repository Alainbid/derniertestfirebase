import React from "react";
import Depenses from "./pages/Depenses";
import NotFound from "./pages/NotFound.tsx";
import Fournisseurs from "./pages/Fournisseurs";
import Recherche from "./pages/Recherche.jsx";
import Pointage from './pages/Pointage'
import Saisie from "./pages/Saisie";


import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Saisie />}></Route>
        <Route path="/Rechercher" element={<Recherche />}></Route>
        <Route path="/Pointage" element={<Pointage />}></Route>
        <Route path="/Depenses" element={<Depenses />}></Route>
        <Route path="/Fournisseurs" element={<Fournisseurs />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
