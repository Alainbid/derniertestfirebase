import React , { useState, useEffect }from 'react';
import "../styles/listedepenses.scss";
import PropTypes from "prop-types";
import { db } from "../pages/Firebasefirestore";
import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";


  const ListeDepenses = (props) => {
  const [Depenses, setDepenses] = useState([]);
  const depensesCollectionRef = collection(db, "depenses");

  useEffect(() => {
    getDepenses();
  }, []);

  const getDepenses = async () => {
    const data = await getDocs(query(depensesCollectionRef, orderBy("nature")));
    setDepenses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //  console.log(data.docs);
  };

  if (!props.open) return null;
  return (
    <div>
    <div className="depense-container" 
      style={{left: props.posdex+'px', 
                   top: props.posdey+'px'}}
    >

      <div className="depense-table">
        <p></p>
        {Depenses.map((item, index) => {
          return (
            <ul
              className="depense-ligne"
              key={item.nature}
              onClick={ () => {
                props.onClose();
                props.onValider(item.nature);
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
ListeDepenses.propTypes = {
  // listPosition: PropTypes.object,
  posdex: PropTypes.number,
  posdey: PropTypes.number,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onValider: PropTypes.func,
};

export default ListeDepenses;