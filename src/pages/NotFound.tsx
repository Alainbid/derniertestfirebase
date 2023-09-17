import React from "react";
import { NavLink } from "react-router-dom";
import '../styles/notfound.scss'
const NotFound = () => {
  return (
    <div className="notfound">
      <div className="notfound-content">
        <h2 >Erreur 404</h2>
        <p >Page inconnue</p>
        <NavLink to="/">
          <i></i>retour à
          l acceuil
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
