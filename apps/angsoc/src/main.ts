import * as express from 'express';
import * as http from 'http';
import * as socketIo from 'socket.io';
import * as mongoose from 'mongoose';

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const documents = {};

io.on('connection', socket => {
  let previousId;
  const safeJoin = currendId => {
    socket.leave(previousId);
    socket.join(currendId);
    previousId = currendId;
  };

  socket.on('getDoc', docId => {
    safeJoin(docId);
    socket.emit('document', documents[docId]);
  });

  socket.on('addDoc', doc => {
    documents[doc.id] = doc;
    safeJoin(doc.id);
    io.emit('documents', Object.keys(documents));
    socket.emit('document', doc);
  });

  socket.on('editDoc', doc => {
    documents[doc.id] = doc;
    socket.to(doc.id).emit('document', doc);
  });

  io.emit('documents', Object.keys(documents));
});

server.listen(4444);
