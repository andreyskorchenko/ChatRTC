import React, { useEffect, useState } from 'react';
import fingerprint from '@fingerprintjs/fingerprintjs';
import axios from 'axios';
import './style.scss';

const Signin = () => {
  const [ nickname, setNickname ] = useState('');
  const [ inProcess, setInProcess ] = useState(false);
  const [ isDisabled, setIsDisabled ] = useState(true);

  useEffect(() => {
    setIsDisabled(!(/^[a-z0-9]{1,30}$/i.test(nickname)));
  }, [nickname]);

  const handlerSetNickname = ({ target }) => {
    setNickname(target.value.trim().toLowerCase());
  };

  const handlerSignin = async ({ code, type }) => {
    const allowKeys = ['Enter', 'NumpadEnter', 'click'];
    if (!allowKeys.includes(code || type) || isDisabled) return;
    const uid = await (await (await fingerprint.load()).get()).visitorId;
    const { data: response } = await axios.post('http://localhost:3000/auth/signin', { uid, nickname });
    console.log(response);
  };

  return (
    <div className='signin'>
      <div className='form'>
        <input type="text"
          autoFocus
          placeholder='Nickname'
          maxLength='30'
          onKeyUp={handlerSignin}
          value={nickname}
          onChange={handlerSetNickname}
        />
        
        <button
          disabled={isDisabled}
          onClick={handlerSignin}
        >
          JOIN
        </button>
      </div>
    </div>
  );
};

export default Signin;