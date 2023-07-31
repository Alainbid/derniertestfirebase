import React, { useState } from "react";
import "../styles/modal.scss";
import PropTypes from "prop-types";

const Modale = (props) => {
  const [leTexte, setLeText] = useState("???");

  const changement = (e) => {
    setLeText(e.target.value);
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
            onInput={changement}
          />
        </div>
        <div className="modal-footer">
          <button className="button-annuler" onClick={props.onClose}>
            Annuler
          </button>

          <button
            type="submit"
            className="button-valid"
            onClick={(event) => {
              event.preventDefault();
              setLeText(document.getElementById("in-text").value);
              props.onValider(leTexte);
              setLeText("");
            }}
          >
            {leTexte !== "" ? "Valider" : "Modifier"}
          </button>
          <button
            className="button-delete"
            onClick={(event) => {
              event.preventDefault();
              const x = document.getElementById("in-text").value;
              //console.log(" delete  = ", x);
              props.onDelete(x);
            }}
          >
            Supprimer
          </button>
          <button
            className="button-ajouter"
            onClick={(event) => {
              event.preventDefault();
              const x = document.getElementById("in-text").value;
              // console.log(" ajouter  = ", x);
              props.onAjouter(x);
            }}
          >
            Ajouter
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
