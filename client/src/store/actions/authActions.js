import axios from 'axios';
import fingerprint from '@fingerprintjs/fingerprintjs';
import { AUTH_CHECK } from '~/store/types';

export const authCheck = () => async dispatch => {
  try {
    const uid = await (await (await fingerprint.load()).get()).visitorId;
    const { status, payload } = (await axios.post('http://localhost:3000/auth/check', { uid })).data;
    if (status === 'ok') {
      dispatch({ type: AUTH_CHECK, payload });
    }
  } catch ({ message }) {
    console.log('Error:', message);
  }
};