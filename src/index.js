import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Hangman from './hangman.js';
import reportWebVitals from './reportWebVitals';
import image0 from './pictures/0.png'
import image1 from './pictures/1.png'
import image2 from './pictures/2.png'
import image3 from './pictures/3.png'
import image4 from './pictures/4.png'
import image5 from './pictures/5.png'
import image6 from './pictures/6.png'
import words from './br-sem-acentos.txt'

ReactDOM.render(
  <React.StrictMode>
      <Hangman tries = {6} frames = {[image0, image1, image2, image3, image4, image5, image6]}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
