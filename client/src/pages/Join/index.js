import React, { useEffect, useState } from 'react';
import './style.scss';

const Join = () => {
  const [ nickname, setNickname ] = useState('');
  const [ inProcess, setInProcess ] = useState(false);
  const [ isDisabled, setIsDisabled ] = useState(true);

  useEffect(() => {
    setIsDisabled(!(/^[a-z0-9]{1,30}$/i.test(nickname)));
  }, [nickname]);

  const handlerSetNickname = ({ target }) => {
    setNickname(target.value.trim().toLowerCase());
  };

  const handlerJoin = async ({ code, type }) => {
    const allowKeys = ['Enter', 'NumpadEnter', 'click'];
    if (!allowKeys.includes(code || type) || isDisabled) return;
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
        
        <button
          disabled={isDisabled}
          onClick={handlerJoin}
        >
          JOIN
        </button>
      </div>
    </div>
  );
};

export default Join;