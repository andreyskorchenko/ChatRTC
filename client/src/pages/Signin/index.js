import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSignin } from '~/store/actions/authActions';
import './style.scss';

const Signin = () => {
  const dispatch = useDispatch();
  const { signin: preloaderSignin } = useSelector(({ preloaders }) => preloaders);
  const [ nickname, setNickname ] = useState('');
  const [ isDisabled, setIsDisabled ] = useState(true);

  useEffect(() => {
    setIsDisabled(!(new RegExp('^[a-z0-9]{1,30}$', 'i').test(nickname)));
  }, [nickname]);

  const handlerSetNickname = ({ target }) => {
    setNickname(target.value.trim().toLowerCase());
  };

  const handlerSignin = ({ code, type }) => {
    const allowKeys = ['Enter', 'NumpadEnter', 'click'];
    if (!allowKeys.includes(code || type) || isDisabled) return;
    dispatch(authSignin(nickname));
  };

  return (
    <div className='signin'>
      <div className='form'>
        <input type="text"
          autoFocus
          placeholder='Nickname'
          maxLength='30'
          readOnly={preloaderSignin}
          onKeyUp={handlerSignin}
          value={nickname}
          onChange={handlerSetNickname}
        />
        
        <button
          disabled={isDisabled || preloaderSignin}
          onClick={handlerSignin}
        >
          JOIN
        </button>
      </div>
    </div>
  );
};

export default Signin;