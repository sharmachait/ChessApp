import GameManager from './Engine/GameManager';
import { Server } from 'node:http';
import { IncomingMessage, ServerResponse } from 'node:http';
import { WebSocketServer } from 'ws';

export default async function setupSocketServer(
  server: Server<typeof IncomingMessage, typeof ServerResponse>,
  gameManager: GameManager
) {
  const wss = new WebSocketServer({ server: server });
  wss.on('connection', function connection(ws) {
    gameManager.addUser(ws);

    ws.on('close', () => {
      console.log('closing');
      gameManager.removeUser(ws);
    });
  });
}
