import React, { useEffect, useMemo, useCallback , useState } from "react";
import { db } from "../pages/Firebasefirestore";
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  endAt,
  startAt,
  updateDoc,
  doc,
} from "firebase/firestore";

const MajTotalEncours = () => {
  const [totalEncours, setTotalEncours] = useState(0.0);
  const journalCollectionRef = useMemo(() => collection(db, "cfbjournal"), []);
  // avec useMemo et [] journalcollectionRef ne sera exécutée une seule fois
  const budgetCollectionRef = useMemo(() => collection(db, "budget"), []);
  
  const ladate = new Date();
  var an = ladate.getFullYear();
  var mois = ladate.getMonth()+1;
//trouver quel est le dernier jour du mois
  const lastDay = new Date(an, mois, 0).getDate();
//fixer le debut et la fin du mois en cours  
 const datedebut = an.toString() + '/' + mois.toString(10) +'/01';
//     console.log("debut", datedebut);
 const datefin = an.toString(10) + '/' +mois.toString(10) +'/'+ lastDay.toString(10);
 //    console.log("fin", datefin);
//  critère de recheche dans budget :  anetmois
  const anetmois = (an * 100) + mois ;

  
  const getTotal =useCallback(  async () => {
    const debut = new Date(datedebut).getTime(); // en millis
    const fin = new Date(datefin).getTime();


// calcul des dépenses budget du mois en cours
    let lequery = query(
      journalCollectionRef,
      where("menage", "==", true),
      orderBy("date", "desc"),
      startAt(fin),
      endAt(debut)
    );
    try {
      var tot = 0.0;
      const data = await getDocs(lequery);
      data.forEach((element) => {   tot += element.data().somme * 100;   });
      setTotalEncours(tot/100);
      // une fois claculé le total du mois on met à jour dans "budget"
    } catch (error) {
      alert("Erreur du query  dans la recherche ", error);
      console.log("Erreur du query   ", error);
      return;
    }
     
   try {
    //recherche n° id de  'ansetmois' dans "budget"
      var laliste = [];
      const q = query(budgetCollectionRef, where("anetmois", "==", anetmois));
      const data = await getDocs(q);
      laliste =data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } catch (error) {
      alert("erreur de connexion budget", error);
      console.log("Erreur ", error);
      return;
    }


    try {
      //mis à jour du nouveau total dans "budget/encours"
       const docRef = doc(budgetCollectionRef, laliste[0].id); 
       await updateDoc(docRef, { encours: totalEncours });
     } catch (error) {
       alert("Error dans delete  budget", error);
       console.log("Error", error);
       return;
     }
   //  console.log("totalEncours",totalEncours);


 

  },[anetmois, budgetCollectionRef, journalCollectionRef, datedebut, datefin,totalEncours]);

  useEffect(()=> {
    const fetchData = async () => {
      await getTotal();
  };
  fetchData();
}, [getTotal]);

  useEffect(() => {
    getTotal();
  },[getTotal]);

  return (
    <div >
     {/* <MajTotalEncours/>  */}
    <ul> dépenses du mois  : {totalEncours} 
    </ul>
    </div>
  );
};

export default MajTotalEncours;
