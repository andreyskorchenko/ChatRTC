import React from 'react';
import './style.scss';

const room = () => {
  return (
    <div className='room'>
      <div className="client">
        <video />
      </div>

      <div className='panel'>
        <div className='panel__buttons'>
          <button className='panel__end'>end call</button>
        </div>
      </div>
    </div>
  );
};

export default room;