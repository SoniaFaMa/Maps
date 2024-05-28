
import React, { useEffect, useState } from 'react';
import Mapa from './Mapa';
import './App.css';

function App() {
  const [listing, setListing] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch("https://6280d4267532b4920f747084.mockapi.io/locations")
      .then(response => response.json())
      .then(data => {
        setListing(data);
      });
  }, []);

  const handleClick = (elemento) => {
    setSelectedUser(elemento);
  };

  return (
    <div className="App">
      <Mapa selectedUser={selectedUser} />
      <div className="container">
        <table className='table'>
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
              <tr key={elemento.id} onClick={() => handleClick(elemento)}>
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