import { useEffect, useState } from "react";
import { db } from "../pages/Firebasefirestore";
import { collection, getDocs, query, where } from "firebase/firestore";
import Navbarre from "./Navbar";

const TotalDesBanques = ({ onTotalsChange }) => {
  const journalCollectionRef = collection(db, "cfbjournal");
  const [totalBso, setTotalBso] = useState(0.0);
  const [totalBbva, setTotalBbva] = useState(0.0);
  const [loading,setLoading] = useState(true);

  const getTotalParBanque = async () => {
    var totBbva = 0.0;
    var  totBso = 0.0;
    
    //************************************************************************ */
    // limit 100 pour les essais
     //let lequery = query(journalCollectionRef, where("banque", "!=", ""), limit(100));
   let lequery = query(journalCollectionRef, where("banque", "!=", " "));
   try {
      const data = await getDocs(lequery);

      const totalDocuments = data.docs.length;
      console.log("totalDocuments",totalDocuments);
     
      data.forEach((element) => {
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
    // console.log("totalBouso", totBso / 100);
    // console.log("totalBbva", totBbva / 100);
    setTotalBso(totBso / 100);
    setTotalBbva(totBbva / 100);
  };

  if(loading)  getTotalParBanque();

  return (
    <div>
      <Navbarre />
      <div style ={{fontFamily:'verdana',  fontSize : 32, marginTop : 100} }>
      {loading ? (
        <p style  ={{ fontSize : 20}}>Je calcule le total par banque ...</p>
        ) : (
          // Display the results when loading is complete
          <>
            <ul style={{ color: "wheat" }}> Bourso : {totalBso.toLocaleString("de", 10)}€ </ul>
            <ul> Bbva : {totalBbva.toLocaleString("de", 10)}€ </ul>
            <ul  style={{ color: "wheat" , fontSize : "1.3rem"}}> Total : {(totalBbva + totalBso).toLocaleString("de", 10)}€ </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default TotalDesBanques;
