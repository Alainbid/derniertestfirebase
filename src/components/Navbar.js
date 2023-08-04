import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.scss";

const Navbarre = () => {
  return (
    <div className="navbar">
      <div className="navbar_href">
           
        {/* <NavLink to="/Modif" className="navlk">
          Modif
        </NavLink> */}
        <NavLink to="/" className="navlk">
          Saisie
        </NavLink>
        {/* <NavLink to="/SignInPage" className="navlk">
          Sign-IN
        </NavLink> */}
        {/* <NavLink to="/SignUpPage" className="navlk">
          Sign_UP
        </NavLink> */}
   
        {/* <NavLink to="/Pointage" className="navlk">
          Pointage
        </NavLink> */}
        <NavLink to="/Rechercher" className="navlk">
          Rechercher
        </NavLink>
        {/* <NavLink to="/Test" className="navlk">
          Test
        </NavLink> */}
        <NavLink to="/Depenses" className="navlk">
          Dépenses
        </NavLink>
        <NavLink to="/Fournisseurs" className="navlk">
         Fournisseurs
        </NavLink>
       
      </div>
    </div>
  );
};

export default Navbarre;
