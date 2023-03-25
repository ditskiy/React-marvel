import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
// import reportWebVitals from './reportWebVitals';
import MarvelServise from './services/MarvelServise';
import './style/style.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
const marvelServise = new MarvelServise
marvelServise.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item.name)))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// reportWebVitals();
