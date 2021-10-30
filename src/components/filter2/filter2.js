import React from 'react';

import './filter2.css';


export const Filter2 = ({ filter }) => {
  
  const [choice, setChoice] = React.useState([]);

  const activeElement = ({ target }) => {
    filter(target.className.split(' ')[1]);
    setChoice({
      'low-price': false,
      'faster': false,
      'optimal': false,
      [target.className.split(' ')[1]]: true
    })    
  };

  return (
    <div className="filter2" onClick={activeElement}>
      <div className={`filter2__element low-price ${choice['low-price'] ? 'choice' : null}`}>Самый дешевый</div>
      <div className={`filter2__element faster ${choice['faster'] ? 'choice' : null}`}>Самый быстрый</div>
      <div className={`filter2__element optimal ${choice['optimal'] ? 'choice' : null}`}>Оптимальный</div>
    </div>
  );
};