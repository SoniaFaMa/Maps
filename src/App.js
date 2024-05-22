
import Mapa from './Mapa';
import React from 'react';
import { useEffect, useState } from 'react';

import './App.css';

function App() {



  const[listing, setListing]=useState([])

  useEffect(()=>{

    
    fetch("https://6280d4267532b4920f747084.mockapi.io/locations") 
    .then(response => response.json())
    .then((data)=>{

        setListing(data)
        //console.log(data)
        


      })


  },[])

 


  const handleClick = (event) => {

    const clickElement = event.target
    console.log("Hola");
    console.log("hace click en",clickElement)
  };

  
  
  return (

    <div className="App">
      <Mapa/>
      

    <div className="container">
   
      
      <table className='table' onClick={handleClick}>
        <thead>
          <tr>
            <th>imagen</th>
            <th>nombre</th>
            <th>Id</th>
            <th>Longitud</th>
            <th>Latitud</th>
          </tr>
          
        </thead>
        <tbody className='tbody'>
          {listing.map(elemento => (
            <tr>
              <td><img className='image' src={elemento.avatar} alt={elemento.name} /></td> 
              <td>{elemento.name}</td>
              <td>{elemento.id}</td>
              <td>{elemento.latitude}</td>
              <td>{elemento.longitude}</td>
            </tr>
            
          ))}
        </tbody>
      </table>
    
     
    </div>
     </div>
   
  );
}


export default App;