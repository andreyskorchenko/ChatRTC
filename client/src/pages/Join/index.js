import React, { useEffect, useState } from 'react';
import './style.scss';

const Join = () => {
  const [ nickname, setNickname ] = useState('');
  const [ isDisabled, setIsDisabled ] = useState(true);
  
  const handlerSetNickname = ({ target }) => setNickname(target.value.trim());
  const isValidNickname = value => new RegExp('^[a-z0-9]{1,30}$', 'i').test(value);

  useEffect(() => setIsDisabled(!isValidNickname(nickname)), [ nickname ]);
  
  const handlerJoin = ({ code, type }) => {
    const allowKeys = ['Enter', 'NumpadEnter', 'click'];
    if (!allowKeys.includes(code || type) || isDisabled) return;
    console.log('Enter:', nickname);
  };

  return (
    <div className='join'>
      <div className='form'>
        <input type="text"
          autoFocus
          placeholder='Nickname'
          maxLength='30'
          onKeyUp={handlerJoin}
          value={nickname}
          onChange={handlerSetNickname}
        />
        
        <button disabled={isDisabled} onClick={handlerJoin}>JOIN</button>
      </div>
    </div>
  );
};

export default Join;