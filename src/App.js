import logo from "./logo.svg";
import "./App.css";
import { db } from "../src/pages/Firebasefirestore";
import {
  // doc,
  // addDoc,
  // updateDoc,
  // deleteDoc,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { useEffect, useState } from "react";

// function App() {

const App = () => {
  const [Depenses,setDepenses] = useState([]);
  const depensesCollectionRef = collection(db, "depenses");

  useEffect(() => {
    getDepenses();
  },);


  const getDepenses = async () => {
    try {
      const data = await getDocs(
        query(depensesCollectionRef, orderBy("nature"))
      );
     setDepenses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log("data.docs",data.docs);
      console.log("depenses", Depenses);
    } catch (error) {
    console.log  ("Erreur du query", alert(error));
    }
  }  
  

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React yet
          </a>
        </header>
      </div>
    );
  };


export default App;
