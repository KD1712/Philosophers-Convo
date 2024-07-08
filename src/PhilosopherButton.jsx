// import React from 'react';
// import './PhilosopherButton.css';

// const PhilosopherButton = ({ philosopher, onClick }) => (
//   <button onClick={() => onClick(philosopher)} className="philosopher-button">
//     {philosopher}
//   </button>
// );

// export default PhilosopherButton;


import React from 'react';
import './PhilosopherButton.css';

const PhilosopherButton = ({ philosopher, onClick }) => (
  <button onClick={() => onClick(philosopher)} className="philosopher-button">
    {philosopher}
  </button>
);

export default PhilosopherButton;
