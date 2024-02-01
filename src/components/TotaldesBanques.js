import {  useEffect, useState } from "react";
import { db } from "../pages/Firebasefirestore";
import { collection, getDocs, query, where } from "firebase/firestore";
import Navbarre from "./Navbar";
import CircularColor from "./ProgressBar";

const TotalDesBanques = ({ onTotalsChange }) => {
  const journalCollectionRef = collection(db, "cfbjournal");
  const [totalBso, setTotalBso] = useState(0.0);
  const [totalBbva, setTotalBbva] = useState(0.0);
  const [loading, setLoading] = useState(true);

useEffect( () => {
  const getTotalParBanque = async () => {
    var totBbva = 0.0;
    var totBso = 0.0;

    //************************************************************************ */
    // limit 100 pour les essais
    //let lequery = query(journalCollectionRef, where("banque", "!=", ""), limit(100));
    let lequery = query(journalCollectionRef, where("banque", "!=", " "));
    try {
      const data = await getDocs(lequery);

      data.forEach((element, index) => {
        // const currentProgress = (index + 1) / data.size * 100;
        // setProgress(currentProgress);
        // Update loading progress based on the current document
        if (element.data().banque === "BOURSO") {
          totBso += element.data().somme * 100;
        } else {
          totBbva += element.data().somme * 100;
        }
        
      });
     
      // une fois calculé le total on met à jour dans budget
    } catch (error) {
      alert("Erreur du query  dans la recherche ", error);
      console.log("Erreur du query   ", error);
      setLoading(false);
      return;
    }
    setLoading(false);
    setTotalBso(totBso / 100);
    setTotalBbva(totBbva / 100);
  };

  if (loading) getTotalParBanque();
}, [journalCollectionRef, loading]);

  return (
    <div>
      <Navbarre />

      <div style={{ fontFamily: "verdana", fontSize: 32, marginTop: 100 ,justifyContent: "center"}}>
        {loading ? (
          <div>
          <p>Je calcule ...</p>
          <CircularColor/></div>
        ) : (
          // Display the results when loading is complete
          <div>
            <ul style={{ color: "wheat" }}>
              {" "}
              Bourso : {totalBso.toLocaleString("de", 10)}€{" "}
            </ul>
            <ul> Bbva : {totalBbva.toLocaleString("de", 10)}€ </ul>
            <ul style={{ color: "wheat", fontSize: "1.3rem" }}>
              {" "}
              Total : {(totalBbva + totalBso).toLocaleString("de", 10)}€{" "}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TotalDesBanques;
