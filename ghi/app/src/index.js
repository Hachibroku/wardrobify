import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

async function loadHatsNShoes() {

  const hatResponse = await fetch('http://localhost:8090/api/hats')
  const shoeResponse = await fetch('http://localhost:8080/api/shoes')

  if (hatResponse.ok && shoeResponse.ok) {
    const hatData = await hatResponse.json()
    const shoeData = await shoeResponse.json()
    root.render(
      <React.StrictMode>
        <App hats={hatData.hats} shoes={shoeData.shoes} />
      </React.StrictMode>
    )
  }
}
loadHatsNShoes()
