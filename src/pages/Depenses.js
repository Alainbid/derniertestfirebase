import React from "react";
import { useState, useEffect } from "react";
import { db } from "./Firebasefirestore";
import Modale from "../components/Modale.jsx";
import '../styles/depenses.scss';
import Navbar from '../components/Navbar';
import {
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
const Depenses = () => {
  const [Depenses, setDepenses] = useState([]);
  const depensesCollectionRef = collection(db, "depenses");
  const [natureDepenses, setNatureDepenses] = useState("xxx");
  const [showModal, setShowModal] = useState(false);
  const [idItem, setIdItem] = useState("");
  const [modalPosition, setModalPosition] = useState([0, 0]);



  useEffect(() => {
    getDepenses();
    //console.log("depenses", Depenses);
  },[]);

  const getDepenses = async () => {
    try {
      const data = await getDocs(
        query(depensesCollectionRef, orderBy("nature"))
      );
      setDepenses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      const SnapshotDepenses = () => {
  const [Depenses, setDepenses] = useState([]);
  const [natureDepenses, setNatureDepenses] = useState("xxx");
  const [showModal, setShowModal] = useState(false);
  const [idItem, setIdItem] = useState("");
  const [modalPosition, setModalPosition] = useState([0, 0]);
  const depensesCollectionRef = collection(db, "depenses");

  useEffect(() => {
    getDepenses();
  });

  const getDepenses = async () => {
    const data = await getDocs(query(depensesCollectionRef, orderBy("nature")));
    setDepenses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
     // console.log(data.docs);
  };

  //**********  MODIFIER ********** */
  const modifier = async (x) => {
    const data = { nature: "?" };
    data.nature = x;
   //  console.log("data nature ", data.nature, "   id  ", idItem);
    const lequel = doc(depensesCollectionRef, idItem);
    await updateDoc(lequel, data);
    setShowModal(false);
    getDepenses();
  };

  const supprimer = async (id) => {
    const lequel = doc(depensesCollectionRef, id);
    await deleteDoc(lequel);
    // console.log("item ", lequel);
    setShowModal(false);
    getDepenses();
  };

  const ajouter = async (newItem) => {
    // console.log("item ajouté  ", newItem);
    await addDoc(collection(db, "depenses"), {
      nature: newItem,
    });
    getDepenses();
    setShowModal(false);
  };

  return (
    <div>
      <Navbar></Navbar>
      
        <Modale
          open={showModal}
          onClose={() => setShowModal(false)}
          posdex={modalPosition[0]}
          posdey={modalPosition[1]}
          leQuel={natureDepenses}
          onValider={(x) => {
            modifier(x);
          }}
          onAjouter={(newItem) => {
            ajouter(newItem);
          }}
          onDelete={() => {
            supprimer(idItem);
          }}
        ></Modale>
      

      <div className="depense-container">
        <ul className="f-li">Types de dépenses</ul>

        <div className="depense-table">
          <p></p>
          {Depenses.map((item, index) => {
            return (
              <ul
                className="depense-ligne"
                key={item.id}
                onClick={(event) => {
                  event.preventDefault();
                  // console.log(" x ", event.clientX, "   y = ", event.clientY);
                  setModalPosition([event.clientX, event.clientY]);
                  setNatureDepenses(item.nature);
                  setIdItem(item.id);
                  setShowModal(true);
                  // console.log("natureBenefs =", { natureDepenses });
                  // console.log("itmId =", { idItem });
                }}
              >
                {/* pour mettre un 0 si de 1 à 9 */}
                {index < 9 ? "0" + (index + 1).toString(10) : index + 1}{" "}
                {item.nature}
              </ul>
            );
          })}
        </div>
      </div>
    </div>
  );
};
    } catch (error) {
      console.log("Erreur du query", alert(error));
    }
    
  };

  //**********  MODIFIER ********** */
  const modifier = async (x) => {
    const data = { nature: "?" };
    data.nature = x;
    //  console.log("data nature ", data.nature, "   id  ", idItem);
    const lequel = doc(depensesCollectionRef, idItem);
    await updateDoc(lequel, data);
    setShowModal(false);
    getDepenses();
  };

  const supprimer = async (id) => {
    const lequel = doc(depensesCollectionRef, id);
    await deleteDoc(lequel);
    // console.log("item ", lequel);
    setShowModal(false);
    getDepenses();
  };

  const ajouter = async (newItem) => {
    // console.log("item ajouté  ", newItem);
    await addDoc(collection(db, "depenses"), {
      nature: newItem,
    });
    getDepenses();
    setShowModal(false);
  };



  return (
    <div>
      <Navbar></Navbar>

      <Modale
        open={showModal}
        onClose={() => setShowModal(false)}
        posdex={modalPosition[0]}
        posdey={modalPosition[1]}
        leQuel={natureDepenses}
        onValider={(x) => {
          modifier(x);
        }}
        onAjouter={(newItem) => {
          ajouter(newItem);
        }}
        onDelete={() => {
          supprimer(idItem);
        }}
      ></Modale>

      <div className="depense-container">
        <ul className="f-li">Types de dépenses</ul>

        <div className="depense-table">
          <p></p>
          {Depenses.map((item, index) => {
            return (
              <ul
                className="depense-ligne"
                key={item.id}
                onClick={(event) => {
                  event.preventDefault();
                  // console.log(" x ", event.clientX, "   y = ", event.clientY);
                  setModalPosition([event.clientX, event.clientY]);
                  setNatureDepenses(item.nature);
                  setIdItem(item.id);
                  setShowModal(true);
                  // console.log("natureBenefs =", { natureDepenses });
                  // console.log("itmId =", { idItem });
                }}
              >
                {/* pour mettre un 0 si de 1 à 9 */}
                {index < 9 ? "0" + (index + 1).toString(10) : index + 1}{" "}
                {item.nature}
              </ul>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Depenses;
