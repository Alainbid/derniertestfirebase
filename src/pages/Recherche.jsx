import React, { useEffect, useState, useRef, useCallback } from "react";
import "../styles/recherche.scss";
// import "../styles/togglebtn.scss";
import Navbarre from "../components/Navbar";
import { db } from "../pages/Firebasefirestore";
import Calendar from "../components/Calendar.tsx"
import Modif from "../components/Modif.tsx";

import {
  // doc,
  // updateDoc,
  //getDoc,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  endAt,
  startAt,
} from "firebase/firestore";

//console.log("journalCollectionRef.", journalCollectionRef.type);

const Recherche = () => {
  const [laListe, setLaListe] = useState([{}]);
  //  const [isActive] = useState(null | 0);
  const [banque, setBanque] = useState("");
  const [pointe, setPointe] = useState(false);
  const [menage, setMenage] = useState(false);
  const [somme, setSomme] = useState(0);
  const [letotal, setLetotal] = useState(0);
  const [note, setNote] = useState("");
  const [nature, setNature] = useState("");
  const [debut, setDebut] = useState(1400000000000);
  //const [fin] = useState(new Date("2050/12/30").getTime());
  const [fin] = useState(2555580680000);
  const [showCalendar, setShowCalendar] = useState(false);
  const checkBou = useRef();
  const checkBva = useRef();
  const checkPointe = useRef();
  const checkMenage = useRef();
  const [modifLequel, setModifLequel] = useState("x");
  const [showNavbar, setShowNavbar] = useState(true);



  /************* getJournal ********** */
  const getJournal = useCallback( async () => {
    let conditions = [];
    if (banque !== "all") conditions.push(where("banque", "==", banque));

    if (checkPointe.current.checked) {
      conditions.push(where("pointe", "==", pointe));
    }
    if (checkMenage.current.checked) {
      conditions.push(where("menage", "==", menage));
    }
    if (somme !== 0) conditions.push(where("somme", "==", parseFloat(somme)));

    if (note !== "") conditions.push(where("note", "==", note));

    if (nature !== "") conditions.push(where("nature", "==", nature));

    conditions.push(orderBy("date", "desc"));

    conditions.push(endAt(debut));
    conditions.push(startAt(fin)); //31/12/2050
    conditions.push(limit(10));

    //************  QUERY ******************************/

    let lequery = query(collection(db, "cfbjournal"), ...conditions);
    try {
      var total = 0;
      const data = await getDocs(lequery);
      data.forEach((element) => {
        total += element.data().somme;
      });
      total = parseInt(total * 100);
      setLetotal(parseFloat(total / 100));
      setLaListe(data.docs.map((ledoc) => ({ ...ledoc.data(), id: ledoc.id })));

       console.log("data", data.docs);
    } catch (error) {
      console.log("Erreur du query ", alert(error));
    }
  },[banque,debut,fin,pointe,menage,nature,somme,note]);

  //******************USEEFFECT ***************************/

  useEffect(() => {
    getJournal();
  },[getJournal]);

  const modifBanque = () => {
    let bso = checkBou.current.checked;
    let bva = checkBva.current.checked;
    if (bso && !bva) {
      setBanque("BOURSO");
    } else if (!bso && bva) {
      setBanque("BBVA");
    } else !bso && !bva ? setBanque("X") : setBanque("all");
  };

  const depuisLe = () => {
    setShowNavbar(true);
    setShowCalendar(true);
    document.getElementById("depuis-container").style.display = "none";
  };

  const modifMenage = (e) => {
    e.target.checked ? setMenage(true) : setMenage(false);
  };

  const modifPointe = (e) => {
    !e.target.checked ? setPointe(true) : setPointe(false);
  };

  const modifSomme = (e) => {
    //console.log("e", e.target.value);
    e.target.value === 0 ? setSomme(0) : setSomme(e.target.value);
  };

  const modifNote = (e) => {
    e.target.value === "" ? setNote("") : setNote(e.target.value);
  };

  const modifDepense = (e) => {
    e.target.value === "" ? setNature("") : setNature(e.target.value);
  };

  const getData = (year, month, day) => {
    document.getElementById("recherche-cont").style.display = "flex";
    document.getElementById("thr-Recherche").style.display = "revert";
   // document.getElementById("recherche-ligne").style.display = "revert";
    let val = new Date(year, month, day).getTime();
    const d = new Date(val).toLocaleDateString("fr-FR");
    // console.log("d", d);
    setDebut(val);
    document.getElementById("d-debut").value = d;
    setShowCalendar(false)
  };

  const selectionne = (doc) => {
    setModifLequel(doc.id);
    console.log("undoc", doc.id);
    console.log("undoc modiflequel", modifLequel);
  };

  //****************************************************** */
  return (
    <div>
      {showNavbar && <Navbarre id="navbar"></Navbarre>}
      {showCalendar && <Calendar id="calencar" sendData={getData} />}

      <p className="h2-Recherche">Recherche d&apos;écritures </p>

      <Modif
        openModif={modifLequel}
        onCloseModif={() => setModifLequel("x")}
      ></Modif>

      <div id="depuis-container">
        <label>
          Rechercher depuis quelle date
          <button
            onClick={() => {
              depuisLe();
            }}
          >
            {" "}
            ?
          </button>
        </label>
      </div>

      <div id="recherche-cont">
        <div id="bsbbva">
          <label className="bourso-container">
            <input
              id="BOURSO"
              value="BOURSO"
              type="checkbox"
              ref={checkBou}
              onChange={modifBanque}
            ></input>
            BOURSO
          </label>

          <label className="bourso-container">
            <input
              id="BBVA"
              value="BBVA"
              type="checkbox"
              ref={checkBva}
              //checked={banque === "BBVA"}
              onChange={modifBanque}
            ></input>
            BBVA
          </label>
        </div>

        <div id="budget-recherche">
          <label className="bourso-container">
            <input
              value={"M"}
              type="checkbox"
              ref={checkMenage}
              checked={menage === true}
              onChange={modifMenage}
            ></input>
            Budget
          </label>
        </div>

        <div id="pointe-container">
          <label className="bourso-container">
            <input
              value={"M"}
              type="checkbox"
              ref={checkPointe}
              id="pointe"
              onChange={modifPointe}
            ></input>
            NON-Pointé
          </label>
        </div>

        <form className="recherche-form">
          <div>
            <label className="label-saisie">
              Montant{" "}
              <input
                className="input-recherche"
                type="number"
                id="somme"
                onChange={modifSomme}
              ></input>
            </label>
          </div>

          <div className="note-container">
            <label className="label-saisie">
              Note{" "}
              <input
                className="input-recherche"
                type="text"
                id="note"
                onChange={modifNote}
              ></input>
            </label>
          </div>

          <div className="depens-container">
            <label className="label-saisie">
              Depense{" "}
              <input
                className="input-recherche"
                type="text"
                id="depense"
                onChange={modifDepense}
              ></input>
            </label>
          </div>

          <div className="debut-container">
            <label className="label-saisie">
              Date début{" "}
              <input
                className="input-recherche"
                type="text"
                id="d-debut"
              ></input>
            </label>
          </div>
        </form>
        <div className="div-span">
          <span className="span-annule">
            <button className="lancer"  onClick={() => {
                getJournal();
                document.getElementById("recherche-cont").style.display = "none";
              }}>
              lancer la recherche
            </button>
            <button
              className="annule"
              onClick={() => {
                console.log("clic", showCalendar, showNavbar);
                if (showCalendar && showNavbar) window.location.reload(true);
              }}
            >
              Annuler
            </button>
          </span>
        </div>
      </div>

      <div id="tb-pointage">
        <table className="tb-pointage">
          <thead className="th-Recherche">
            <tr id="thr-Recherche">
              <th style={{ width: 2 + "em" }}>N°</th>
              <th style={{ width: 6 + "em" }}>Banque</th>
              <th style={{ width: 11 + "em" }}>Date</th>
              <th style={{ width: 3 + "em", textAlign: "center" }}>M.</th>
              <th
                style={{
                  width: 10 + "em",
                  textAlign: "right",
                  color: letotal < 0 ? "red" : "green",
                }}
              >
                <i
                  className="r-total"
                  style={{ color: letotal < 0 ? "red" : "green" }}
                >
                  total {letotal}
                </i>
              </th>
              <th style={{ width: 1 + "em" }}></th>
              <th style={{ width: 3 + "em", textAlign: "center" }}>P.</th>
              <th style={{ width: 1 + "em" }}></th>
              <th style={{ width: 12 + "em" }}>Fournisseurs</th>
              <th style={{ width: 16 + "em" }}>Dépenses</th>
              <th style={{ width: 4 + "em" }}>Mode</th>
              <th style={{ width: 12 + "em" }}>Note</th>
            </tr>
          </thead>
          <tbody id="ligne">
            {laListe.map((undoc, index) => {
              return (
                <tr
                  onClick={(event) => {
                    event.preventDefault();
                    selectionne(undoc);
                  }}
                  className="tr-ligne"
                  key={undoc.id}
                  // style={
                  //   isActive === index
                  //     ?  { background: "yellow"}
                  //     : { background: "green" }
                  // }
                >
                  <td style={{ width: 2 + "em" }}>{index + 1}</td>
                  <td style={{ width: 6 + "em" }}>{undoc.banque}</td>
                  <td style={{ width: 11 + "em" }}>
                    {new Date(undoc.temps).toLocaleDateString()}
                  </td>
                  <td style={{ width: 3 + "em" }}>
                    {undoc.menage === true ? "M" : " "}
                  </td>
                  <td
                    style={{
                      width: 10 + "em",
                      color: undoc.somme < 0 ? "red" : "green",
                      textAlign: "right",
                    }}
                  >
                    {undoc.somme}
                  </td>
                  <td style={{ width: 1 + "em" }}></td>
                  <td style={{ width: 3 + "em" }}>
                    {undoc.pointe === true ? "P" : "."}
                  </td>
                  <td style={{ width: 1 + "em" }}></td>
                  <td style={{ width: 12 + "em" }}>{undoc.benef} </td>
                  <td style={{ width: 16 + "em" }}>{undoc.nature} </td>
                  <td style={{ width: 4 + "em" }}>{undoc.mode} </td>
                  <td style={{ width: 12 + "em" }}>{undoc.note}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Recherche;
