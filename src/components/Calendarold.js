import React, { useState, useEffect } from "react";
import "../styles/calendar.scss";



const Calendar = ({sendData}) => {
 
  // const [today,setToday] = useState<Date>( new Date());
  const [today] = useState(() => new Date());
  // const [showBtn,setShowBtn] = useState(false);
  const [month, setMonth] = useState(() => today.getMonth());
  const [year, setYear] = useState(() => today.getFullYear());
  const [nDays, setnDays] = useState(() =>
    new Date(year, month + 1, 0).getDate()
  );
  const [startDay, setStartDay] = useState(() =>
    new Date(year, month, 1).getDay()
  );
  const [day] = useState(() => today.getDate());

  const monthTag = [
    "Jan",
    "Fev",
    "Mar",
    "Avr",
    "Mai",
    "Jun",
    "Jul",
    "Aou",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  


  const days = document.getElementsByTagName("td");
  


  useEffect(() => {
    for (let k = 0; k < 42; k++) {
      days[k].innerHTML = "";
      days[k].id = "";
      days[k].className = "";
    }
    voirCalendar(true);
    setnDays(new Date(year, month + 1, 0).getDate());
    setStartDay(new Date(year, month, 1).getDay());
    var n = startDay;
    for (let i = 1; i <= nDays; i++) {
      days[n].innerHTML = i.toString();
      n++;
    }
    let v = 0;
    for (let j = 0; j < 42; j++) {
      if (days[j].innerHTML === "") {
        days[j].id = "disabled";
        v++;
      } else {
        days[j].id = "today";
        let s = v - 1;
        days[day + s].id = "selected";

        days[j].addEventListener("click", () => {
          days[j].id = "idselected"
          let x = parseInt (document.getElementById('idselected').innerHTML , 10);
           // console.log("day",x);
           onValid(x);
        });
      }
    }

  },[year, month, startDay, days, nDays, day,onValid]);

const voirCalendar = (open) => {
  //console.log("open",open);
  open ? 
  document.getElementById('calencar').style.display="flex":
  document.getElementById('calencar').style.display="none";  
}

  const preMonth = () => {
    if (month < 1) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month > 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  function onValid(d)  {
    sendData =(toUnixTime(year, month, d, "recherche"));
    console.log("send Data",sendData);
    document.getElementById('calencar').style.display = "none";
}

  //if(!open) return null;

  return (
    <div id="dbut" >
      
      <div className="elegant-calencar" id="calencar">
        <div id="header" className="clearfix">
          <div className="pre-button0" onClick={() => preMonth()}>
            {"<"}
          </div>
          <div className="head-info">
            <div className="head-month"  >
              {day}
              {"-"}
              {monthTag[month]}
              {"-"}
              {year}
            </div>
          </div>
          <div className="next-button0" onClick={() => nextMonth()}>
            {">"}
          </div>
        </div>
        <table id="calendar">
          <thead className="th-cal">
            <tr className="tr-cal">
              <th>Dim</th>
              <th>Lun</th>
              <th>Mar</th>
              <th>Mer</th>
              <th>Jeu</th>
              <th>Ven</th>
              <th>Sam</th>
            </tr>
          </thead>
          <tbody  className="tb-cal">
            <tr className="tr-cal">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;


const toUnixTime = (year, month, day, pourqui) => {
  let datechoisie = new Date(year, month , day).getTime();
  // console.log("datechoisie",datechoisie);
   let hoy = new Date().getTime();
   let tx = new Date().toDateString();
  let hoyoh = new Date(tx).getTime();
  let datechoisieHeure = datechoisie + (hoy-hoyoh);
   console.log("datechoisieHeure", new Date(datechoisieHeure).toLocaleString());
   console.log("datechoisieHeure", datechoisieHeure);

  if (pourqui === "recherche") {
    return (datechoisie);
  } else if (pourqui === "saisie"){
    return (datechoisieHeure);
  }else{ return null}
};
