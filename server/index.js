const express = require('express');
const cors = require('cors');
const { WebSocketServer } = require('ws');
const { v4 } = require('uuid');

const HT_PORT = 3000;
const HT_HOST = 'localhost';

const WS_PORT = 3030;
const WS_HOST = 'localhost';

const room = new Map([
  ['clients', new Map()]
]);

/**
 * WS Server
*/
const WSServer = new WebSocketServer({ host: WS_HOST, port: WS_PORT });

/**
 * HTTP Server
*/
const app = express();
app.use(cors());
app.use(express.json());

app.post('/auth/signin', (req, res) => {
  try {
    const [ uid, nickname ] = [
      req.body.uid.trim().toLowerCase(),
      req.body.nickname.trim().toLowerCase()
    ];
    
    if (!uid.length || !nickname.length) throw new Error('Invalid user data');
    
    const clients = room.get('clients');
    if (clients.has(nickname)) throw new Error('Nickname is taken');
    for (const [, _uid] of clients) {
      if (_uid === uid) throw new Error('You uid is taken');
    }

    clients.set(nickname, uid);
    return res.status(200).json({
      status: 'ok',
      payload: { nickname, uid }
    });
  } catch ({ message }) {
    return res.status(400).json({ status: 'error', message });
  }
});

app.post('/auth/check', (req, res) => {
  try {
    const { uid } = req.body;
    const clients = room.get('clients');
    for (const [_nickname, _uid] of clients) {
      if (uid === _uid) {
        return res.status(200).json({
          status: 'ok',
          payload: {
            nickname: _nickname,
            uid: _uid
          }
        });
      }
    }
    
    throw new Error('Invalid auth data');
  } catch ({ message }) {
    return res.status(401).json({ status: 'error', message });
  }
});

app.listen(HT_PORT, HT_HOST, () => {
  console.log(`HTTP Server started: ${HT_HOST} on ${HT_PORT}`);
});