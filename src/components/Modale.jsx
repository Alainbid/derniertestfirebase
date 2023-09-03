import React, { useState } from "react";
import "../styles/modal.scss";
import PropTypes from "prop-types";

const Modale = (props) => {
  const [leTexte, setLeText] = useState('???');

  const changement = (e) => {
    setLeText(e.target.value);
    document.getElementById('submit').style.visibility='visible'
    document.getElementById('delete').style.visibility='hidden'
    console.log('letexte', leTexte);
  };

  

  if (!props.open) return null;

  return (
    // <div className="modal-overlay" style={top= {posdex}}>
    <div className="modal-overlay" >
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-tittle"> Modifier la liste </h4>
        </div>

        <div className="modal-body">
          Sélection
          <input
            autoComplete="off"
            type="text"
            className="input-text"
            id="in-text"
            defaultValue={props.leQuel}
            // onChange={changement}
             onInput={changement}
          
            />
        </div>

        <div className="modal-footer">
         
          <button
            type="submit"
            id="submit"
            className="button-valid"
            onClick={(event) => {console.log('avant lequel', leTexte);
              event.preventDefault();
              setLeText(document.getElementById("in-text").value);
              console.log('leteste',leTexte);
             
              if(leTexte !== ''){
              props.onValider(leTexte);
              setLeText("");}
            }}
          
              >
             Valider
          </button>

          <button
            className="button-delete"
            id="delete"
            onClick={(event) => {
              event.preventDefault();
              const x = document.getElementById("in-text").value;
              //console.log(" delete  = ", x);
              props.onDelete(x);
            }}  >
            Supprimer
          </button>

          <button
            className="button-ajouter"
            onClick={(event) => {
              event.preventDefault();
              const x = document.getElementById("in-text").value;
              // console.log(" ajouter  = ", x);
              props.onAjouter(x);
            }}  >
            Ajouter
          </button>

          <button className="button-annuler" onClick={props.onClose}>
            Annuler
          </button>

        </div>
      </div>
    </div>
  );
};

Modale.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onValider: PropTypes.func,
  onDelete: PropTypes.func,
  onAjouter: PropTypes.func,
  leQuel: PropTypes.string.isRequired,
};
export default Modale;
