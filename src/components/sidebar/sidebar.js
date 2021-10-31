import React from 'react';

import './sidebar.css';

export const Sidebar = ({ setStateFilter, stateFilter }) => {
  
  const handleCheckboxChange = ({target}) => {
    setStateFilter({
      ...stateFilter,
      [target.value]: target.checked
    })
  };

  return (
    <div className="dummy">
      <div className="sidebar">
        <h3>Количество пересадок</h3>
        <form onChange={handleCheckboxChange}>
          <label >
            <input type='checkbox' 
              className='input visually-hidden' 
              defaultChecked={true}
              value='all'
              />
            <span className='checker'></span>
            Все
          </label>
          <label >
            <input type='checkbox'
              className='input visually-hidden'
              value='zero'
            />
            <span className='checker'></span>
            Без пересадок
          </label>
          <label>
            <input type='checkbox'
              className='input visually-hidden'
              value='one'
            />
            <span className='checker'></span>
            1 пересадка
          </label>
          <label>
            <input type='checkbox'
              className='input visually-hidden'
              value='two'
            />
            <span className='checker'></span>
            2 пересадки
          </label>
          <label>
            <input type='checkbox'
              className='input visually-hidden'
              value='three'
            />
            <span className='checker'></span>
            3 пересадки
          </label>
        </form>
      </div>
    </div> 
  )
};