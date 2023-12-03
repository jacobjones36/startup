const { WebSocketServer } = require('ws');
const uuid = require('uuid');

function peerProxy(httpServer) {
    const wss = new WebSocketServer({ noServer: true });

    httpServer.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request);
        });
    });

    let connections = [];
    wss.on('connection', (ws) => {
        const connection = { id: uuid.v4(), alive: true, ws: ws };
        connections.push(connection);
    
        // Forward messages to everyone except the sender
        ws.on('message', function message(data) {
          connections.forEach((c) => {
            if (c.id !== connection.id) {
              c.ws.send(data);
            }
          });
        });
    
        // Remove the closed connection so we don't try to forward anymore
        ws.on('close', () => {
          connections.findIndex((o, i) => {
            if (o.id === connection.id) {
              connections.splice(i, 1);
              return true;
            }
          });
        });
        
        ws.on('pong', () => {
            connection.alive = true;
        });
    });



    setInterval(() => {
        connections.forEach((c) => {
            if (!c.alive) {
                c.ws.terminate();
            } else {
                c.alive = false;
                c.ws.ping();
            }
        });
    }, 10000);
}
module.exports = { peerProxy };
