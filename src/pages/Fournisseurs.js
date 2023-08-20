import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/depenses.scss";

import { db } from "../pages/Firebasefirestore";
import Modale from "../components/Modale";
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

const SnapshotBenefs = () => {
  const [Benefs, setBenefs] = useState([]);
  const [naturebenefs, setNaturebenefs] = useState("xxx");
  const [showModal, setShowModal] = useState(false);
  const [idItem, setIdItem] = useState("");
  const [modalPosition, setModalPosition] = useState([0, 0]);

  const benefsCollectionRef = collection(db, "benef");

 

  const getBenefs = useCallback( async () => {
    console.log('try');
    const data = await getDocs(query(benefsCollectionRef, orderBy("qui")));
    setBenefs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //  console.log(data.docs);
  },[]);

  useEffect(() => {
    getBenefs();
  },[getBenefs]);


  //**********  MODIFIER ********** */
  const modifier = async (x) => {
    const data = { qui: "?" };
    data.qui = x;
    //console.log("x", x);
    // console.log("data nature ", data.qui, "   id  ", idItem);
    const lequel = doc(benefsCollectionRef, idItem);
    await updateDoc(lequel, data);
    setShowModal(false);
    getBenefs();
  };

  const supprimer = async (id) => {
    const lequel = doc(benefsCollectionRef, id);
    await deleteDoc(lequel);
    // console.log("item ", lequel);
    setShowModal(false);
    getBenefs();
  };

  const ajouter = async (newItem) => {
    // console.log("item ajouté  ", newItem);
    await addDoc(collection(db, "benef"), {
      qui: newItem,
    });
    getBenefs();
    setShowModal(false);
  };

  return (
    <div>
      <Navbar></Navbar>
      {
        <Modale
          open={showModal}
          onClose={() => setShowModal(false)}
          posdex={modalPosition[0]}
          posdey={modalPosition[1]}
          leQuel={naturebenefs}
          onValider={(x) => {
            modifier(x);
          }}
          onAjouter={(newItem) => {
            ajouter(newItem);
          }}
          onDelete={() => {
            supprimer(idItem);
          }}
        >
          <p></p>
        </Modale>
      }

      <div className="depense-container">
        <ul className="f-li">Liste des fournisseurs</ul>

        <div className="depense-table">
          <p></p>
          {Benefs.map((item, index) => {
            return (
              <ul
                className="depense-ligne"
                key={item.id}
                onClick={(event) => {
                  event.preventDefault();
                  // console.log(" x ", event.clientX, "   y = ", event.clientY);
                  setModalPosition([event.clientX, event.clientY]);
                  setNaturebenefs(item.qui);
                  setIdItem(item.id);
                  setShowModal(true);
                }}
              >
                {/* pour mettre un 0 si de 1 à 9 */}
                {index < 9 ? "0" + (index + 1).toString(10) : index + 1}{" "}
                {item.qui}
              </ul>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SnapshotBenefs;
