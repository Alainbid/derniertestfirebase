import React from "react";
import Depenses from "./pages/Depenses";
import Saisie   from './pages/Saisie.tsx';
import NotFound from './pages/NotFound.tsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Saisie />}></Route>
        <Route path="/Depenses" element={<Depenses />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
