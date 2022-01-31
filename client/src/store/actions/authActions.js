import axios from 'axios';
import fingerprint from '@fingerprintjs/fingerprintjs';
import { AUTH_CHECK, AUTH_SIGNIN } from '~/store/types';
import { preloaderSigninShow, preloaderSigninHide } from '~/store/actions/preloadersActions';

export const authCheck = () => async dispatch => {
  try {
    const uid = await (await (await fingerprint.load()).get()).visitorId;
    const { status, payload } = (await axios.post('http://localhost:3000/auth/check', { uid })).data;
    if (status === 'ok') {
      return dispatch({ type: AUTH_CHECK, payload });
    }

    throw new Error('Error on server');
  } catch ({ message }) {
    console.log('Error:', message);
  }
};

export const authSignin = nickname => async dispatch => {
  try {
    dispatch(preloaderSigninShow());
    const uid = await (await (await fingerprint.load()).get()).visitorId;
    const { status, payload } = (await axios.post('http://localhost:3000/auth/signin', {
      nickname, uid
    })).data;

    if (status === 'ok') {
      return dispatch({ type: AUTH_SIGNIN, payload });
    }

    throw new Error('Error on server');
  } catch ({ message }) {
    console.log('Error:', message);
  } finally {
    dispatch(preloaderSigninHide());
  }
};