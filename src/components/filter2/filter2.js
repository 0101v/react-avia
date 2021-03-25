import React from 'react';

import './filter2.css';


const Filter2 = ({ filter }) => {
  const activeElement = ({ target }) => {
    filter(target.className.split(' ')[1]);    
  }
  return (
    <div className="filter2" onClick={activeElement}>
      <div className="filter2__element low-price" >Самый дешевый</div>
      <div className="filter2__element faster">Самый быстрый</div>
      <div className="filter2__element optimal">Оптимальный</div>
    </div>
  )
};

export default Filter2;