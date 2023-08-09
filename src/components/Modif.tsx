import React, { useCallback, useEffect, useState } from "react";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../pages/Firebasefirestore";
import "../styles/modif.scss";
import ListeDepenses from "./Listedepenses";
import PropTypes from "prop-types";

// const lequel = "bKseplfKB3NBOAcLiEa0";

const Modif = (props: any) => {
  const docRef = doc(db, "cfbjournal", props.openModif);
  const [somme, setSomme] = useState(0);
  const [banque, setBanque] = useState("");
  const [nature, setNature] = useState("");
  const [benef, setBenef] = useState("");
  const [mode, setMode] = useState("");
  const [note, setNote] = useState("");
  const [menage, setMenage] = useState(true);
  const [pointe, setPointe] = useState(false);
  const [date, setDate] = useState("01/01/2023");
  const [showListDepenses, setShowListDepenses] = useState(false);
  const [listPosition, setListPosition] = useState([0, 0]);

  // console.log("props", props.openModif);
  // const lequel:string = props.openModif;
  // console.log("lequel props ", lequel);



  const getDocument = useCallback( async () => {
    if (props.openModif !== "x") {
      console.log("getdoc", props.openModif);

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("data", docSnap.data());
        setSomme(docSnap.get("somme"));
        setBanque(docSnap.get("banque"));
        setNature(docSnap.get("nature"));
        setBenef(docSnap.get("benef"));
        setNote(docSnap.get("note"));
        setMenage(docSnap.get("menage"));
        setPointe(docSnap.get("pointe"));
        setMode(docSnap.get("mode"));
        const d = docSnap.get("temps");
        setDate(new Date(d).toLocaleDateString("fr-FR"));
      } else {
        alert("document inconnu");
      }
    }
  },[docRef,props.openModif]);

    useEffect(() => {
    getDocument();
  }, [getDocument]);

  const modifBanque = async (e: any) => {
    let x = e.target.value.toUpperCase();
    await setBanque(x);
    await updateDoc(docRef, { banque: x });
    
    msg();
  };

  const modifSomme = async (e: any) => {
    setSomme(e.target.value);
    await updateDoc(docRef, { somme: e.target.value });
    msg();
    
  };

  const modifNature = async (e: any) => {
    setNature(e);
    await updateDoc(docRef, { nature: e });
    msg();
  };

  const modifBenef = async (e: any) => {
    setBenef(e.target.value);
    await updateDoc(docRef, { benef: e.target.value });
    msg();
  };

  const modifNote = async (e: any) => {
    setNote(e.target.value);
    await updateDoc(docRef, { note: e.target.value });
    msg();
  };

  const modifMenage = async (e: any) => {
    e.target.checked ? setMenage(true) : setMenage(false);
    e.target.checked
      ? await updateDoc(docRef, { menage: true })
      : await updateDoc(docRef, { menage: false });
    msg();
  };

  const modifPointe = async (e: any) => {
    msg();
    e.target.checked ? setPointe(true) : setPointe(false);

    e.target.checked
      ? await updateDoc(docRef, { pointe: true })
      : await updateDoc(docRef, { pointe: false });
  };

  const modifMode = async (e: any) => {
    setMode(e.target.value);
    await updateDoc(docRef, { mode: e.target.value });
    msg();
  };

  const onDelete = async () => {
    await deleteDoc(docRef);
  };

  const msg = () => {
    let w = window.innerWidth / 2;
    let z = w - 258 + "px";
    document.getElementById("modif-msg")!!.style.display = "flex";
    document.getElementById("modif-msg")!!.style.left = z;
    setTimeout(function () {
      document.getElementById("modif-msg")!!.style.display = "none";
    }, 2500);
  };

  if (props.openModif === "x") return null;

  //******************************************************* */
  return (
    <div>
      <ListeDepenses
        //  open={showListDepenses}
        open={''}
        onClose={() => {
          setShowListDepenses(false);
        }}
        posdex={listPosition[0]}
        posdey={listPosition[1]}
        onValider={(lequel) => {
          modifNature(lequel);
        }}
      ></ListeDepenses>
      <div>
        <div className="modif-msg" id="modif-msg" style={{ left: "300px" }}>
          Modification enregistrée
        </div>
        <form
          className="modif-container"
          id="modif-container"
          autoComplete="off"
        >
          <label className="modif-label">
            Banque
            <input
              id="banque"
              className="modif-saisie"
              onChange={(event) => {
                modifBanque(event);
              }}
              type="text"
              value={banque}
            ></input>
          </label>
          <label className="modif-label">
            Somme
            <input
              className="modif-saisie"
              onChange={(event) => {
                modifSomme(event);
              }}
              type="number"
              id="somme"
              value={somme}
            ></input>
          </label>
          <label className="modif-label">
            Dépense
            <input
              className="modif-saisie"
              onClick={(event) => {
                setListPosition([event.clientX - 200, event.clientY - 270]);
                setShowListDepenses(false);
              }}
              onChange={(event) => {
                
                  modifNature(event);
                
              }}
              type="text"
              id="nature"
              value={nature}
            ></input>
          </label>
          <label className="modif-label">
            Fournisseur
            <input
              className="modif-saisie"
              onChange={(event) => {
                  modifBenef(event);
              }}
              type="text"
              id="benef"
              value={benef}
            ></input>
          </label>
          <label className="modif-label">
            Note
            <input
              className="modif-saisie"
              onChange={(event) => {
                  modifNote(event);
              }}
              autoComplete="off"
              type="text"
              id="note"
              value={note}
            ></input>
          </label>
          <label className="modif-label">
            Budget
            <input
              className="modif-menag"
              onChange={(event) => {
                  modifMenage(event);
              }}
              type="checkBox"
              id="menage"
              checked={menage === true}
            ></input>
          </label>
          <label className="modif-label">
            Pointé
            <input
              className="modif-menag"
              onChange={(event) => {
                  modifPointe(event);
              }}
              type="checkBox"
              id="pointe"
              checked={pointe === true}
            ></input>
          </label>

          <fieldset className="fdset-modif">
            <div className="mode-container">
              <label className="modif-radio">
                <input
                  value="Visa"
                  type="radio"
                  name="mode"
                  id="visa"
                  checked={mode === "Visa"}
                  onChange={modifMode}
                ></input>
                Visa
              </label>

              <label className="modif-radio">
                <input
                  value="Chq"
                  type="radio"
                  name="mode"
                  id="cheque"
                  checked={mode === "Chq"}
                  onChange={modifMode}
                ></input>
                Chèque
              </label>

              <label className="modif-radio">
                <input
                  value="Virnt"
                  type="radio"
                  name="mode"
                  id="virnt"
                  checked={mode === "Virnt"}
                  onChange={modifMode}
                ></input>
                Virement
              </label>

              <label className="modif-radio">
                <input
                  value="Cash"
                  type="radio"
                  name="mode"
                  id="cash"
                  checked={mode === "Cash"}
                  onChange={modifMode}
                ></input>
                Cash
              </label>
            </div>
          </fieldset>

          <label className="modif-label">
            Ecriture du
            <i className="modif-saisie" id="date">
              {date}
            </i>
          </label>
        </form>
        <p></p>
        <div className="modif-btn">
          <button type="button" className="modif-button" onClick={onDelete}>
            Supprimer l&apos;écriture
          </button>
          <button
            type="button"
            id="btn-cancel"
            className="modif-button"
            onClick={props.onCloseModif}
            // onClick={onCancel}
          >
            Retour
          </button>
        </div>
      </div>
    </div>
  );
};

Modif.propTypes = {
  openModif: PropTypes.string,
  onCloseModif: PropTypes.func,
  listPosition: PropTypes.object,
  posdex: PropTypes.number,
  posdey: PropTypes.number,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onValider: PropTypes.func,
};
export default Modif;
