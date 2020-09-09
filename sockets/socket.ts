import { Socket } from 'socket.io';


export const disconnect = ( client: Socket ) => {
     
     client.on('disconnect', () => {
          console.log('Cliente desconectado');
     });
}

//Escuchar mensajes
export const message = (client: Socket, io: SocketIO.Server ) => {
     
     client.on('message', ( payload: { from:string, body:string } ) => {
          console.log('Mensaje recibido', payload);

          io.emit('message-new', payload ){
               console.log('Mensaje recibido', payload);
          }
     });     
}