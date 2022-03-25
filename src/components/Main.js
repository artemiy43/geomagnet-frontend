import React, { useState } from "react";
import Maps from "./Map";
import ZDMap from "./3DMap";
import { api } from "./api";
function Main(props) {
  const [coordinateX, setCoordinateX] = React.useState(0);
  const [coordinateY, setCoordinateY] = React.useState(0);

  const [parametres, setParametres] = React.useState([]);

  const [value, setValue] = useState(0);

  const [epoha, setEpoha] = useState(0);
  const [year, setYear] = useState(2021);
  const [isOpen, setIsOpen] = useState(false);

  

  function handleIsOpen(){
    setIsOpen(!isOpen);
  }

  const num = 0;
  let Mapitems = [
    <ZDMap year={year} epoha={epoha} num={num} onClick={handleMapClick}  onClickMap={handleParametres}/>,
    <Maps year={year} epoha={epoha} num={num} onClick={handleMapClick}  onClickMap={handleParametres}/>
  ];

  

  const items = [
    { label: "3DMap", value: 0 },
    { label: "2DMap", value: 1 },
  ];


  function handleMapClick(X, Y) {
    setCoordinateX(X);
    setCoordinateY(Y);
  }
  
  React.useEffect(()=> {
    api.getInfo(coordinateX, coordinateY, epoha, year)
    .then((res) => {
      console.log(res);
      handleParametres(res);
    })
    .catch(err => {
      console.log(err);
    });
  },[coordinateX,coordinateY, epoha, year]);
  

  function handleParametres(parametres) {
    setParametres(parametres);
  }

  function handleDateClick(value) {
    const year= Number(value[0] + "" + value[1] + "" + value[2] + "" + value[3]);
    const month = Number(value[5] + "" + value[6]);
    
    setYear(year);

    if (month>7)
      setEpoha(5);
    else
      setEpoha(1);
  }
  

  
  return(
    <>
      <main className="content">
        <div className={(isOpen===true) ? "menu" : "menu-unable"} id="menu">
            <p className="menu__title">Geomagnetic Calculator</p>
            <select className="select" onChange={e => setValue(e.currentTarget.value)}>
              {items.map(item => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <input type="date" className="date" onChange={e => handleDateClick(e.currentTarget.value)}/>
            <button type="button" onClick={handleIsOpen}>{(isOpen===true) ? "Закрыть" : "Открыть"}</button>
            


            <div className={(isOpen===true) ? "menu__grid-container" : "menu__grid-container-unable"}>
              <p className="menu__span-coordinates">Geomagnet coordinates</p>
              <p className="menu__span-origin">Latitude (MAG): </p>
              <p className="menu__span-origin">{(parametres.length!==0) ? parametres[13].toFixed(4) : "NULL"}</p>
              <p className="menu__span-origin">Longitude (MAG): </p>
              <p className="menu__span-origin">{(parametres.length!==0) ? parametres[14].toFixed(4) : "NULL"}</p>
              <p className="menu__span-origin">R (MAG), [km]: </p>
              <p className="menu__span-origin">{(parametres.length!==0) ? parametres[15].toFixed(4) : "NULL"}</p>
              <p className="menu__span-coordinates">Parameters of Geomagnetic Dipole</p>
              <p className="menu__span-origin">Coordinates of North Pole, [degrees] N: </p>
              <p className="menu__span-origin">{(parametres.length!==0) ? parametres[10].toFixed(4) : "NULL"}</p>
              <p className="menu__span-origin">Coordinates of North Pole, [degrees] E: </p>
              <p className="menu__span-origin">{(parametres.length!==0) ? parametres[11].toFixed(4) : "NULL"}</p>
              <p className="menu__span-origin">Magnetic Moment, [T∙m3]: </p>
              <p className="menu__span-origin">{(parametres.length!==0) ? parametres[12].toFixed(4) : "NULL"}</p>
              <p className="menu__span-coordinates">Parameters of Geomagnetic Field</p>
              <p className="menu__span-origin">Induction Potential, [nT∙km]: </p>
              <p className="menu__span-origin">{(parametres.length!==0) ? parametres[3].toFixed(4) : "NULL"}</p>
              <p className="menu__span-origin">North Component (X), [nT]: </p>
              <p className="menu__span-origin">{(parametres.length!==0) ? parametres[4].toFixed(4) : "NULL"}</p>
              <p className="menu__span-origin">East Component (Y), [nT]: </p>
              <p className="menu__span-origin">{(parametres.length!==0) ? parametres[5].toFixed(4) : "NULL"}</p>
              <p className="menu__span-origin">Down Component (Z), [nT]:</p>
              <p className="menu__span-origin">{(parametres.length!==0) ? parametres[6].toFixed(4) : "NULL"}</p>
              <p className="menu__span-origin">Total Intensity (F), [nT]:</p>
              <p className="menu__span-origin">{(parametres.length!==0) ? parametres[7].toFixed(4) : "NULL"}</p>
              <p className="menu__span-origin">Magnetic Declination, [degrees]:</p>
              <p className="menu__span-origin">{(parametres.length!==0) ? parametres[8].toFixed(4) : "NULL"}</p>
              <p className="menu__span-origin">Magnetic Inclination, [degrees]:</p>
              <p className="menu__span-origin">{(parametres.length!==0) ? parametres[9].toFixed(4) : "NULL"}</p>
            </div>
        </div>
        <div className="map__container page__container">
            {Mapitems[value]}
        </div>
      </main>
    </>
  );
}

export default Main;