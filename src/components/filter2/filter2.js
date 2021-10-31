import React from 'react';

import './filter2.css';


export const Filter2 = ({ setStateFilter, stateFilter }) => {
  
  const activeElement = ({ target }) => {
    setStateFilter({
      ...stateFilter,
      item: target.className.split(' ')[1],
      'low-price': false,
      'faster': false,
      'optimal': false,
      [target.className.split(' ')[1]]: true
    });
  };

  return (
    <div className="filter2" onClick={activeElement}>
      <div className={`filter2__element low-price ${stateFilter['low-price'] ? 'choice' : null}`}>Самый дешевый</div>
      <div className={`filter2__element faster ${stateFilter['faster'] ? 'choice' : null}`}>Самый быстрый</div>
      <div className={`filter2__element optimal ${stateFilter['optimal'] ? 'choice' : null}`}>Оптимальный</div>
    </div>
  );
};