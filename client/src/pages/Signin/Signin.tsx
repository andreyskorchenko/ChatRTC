import { ChangeEvent, useState, useMemo } from 'react';
import styles from './Signin.module.scss';

export const Signin = () => {
  const [nickname, setNickname] = useState('');
  const isDisabled = useMemo(() => !new RegExp('^[a-z0-9]{1,30}$', 'i').test(nickname), [nickname]);

  const changeNickname = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setNickname(value.trim().toLowerCase());
  };

  const handlerSignin = () => {
    console.log('[SIGNIN]');
  };

  return (
    <div className={styles.signin}>
      <div className={styles.form}>
        <input
          autoFocus
          type="text"
          placeholder="Nickname"
          maxLength={30}
          value={nickname}
          onChange={changeNickname}
        />

        <button disabled={isDisabled} onClick={handlerSignin}>
          JOIN
        </button>
      </div>
    </div>
  );
};
