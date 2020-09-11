import { Socket } from 'socket.io';
import { UserList } from '../classes/user-list';
import { User } from '../classes/user';


export const userListConnect = new UserList;

export const connectClient = ( client: Socket ) => {
     const user = new User(client.id);

     userListConnect.addUserList(user);
}

export const disconnect = ( client: Socket ) => {
     
     client.on('disconnect', () => {
          const user = userListConnect.deleteUser(client.id);

          console.log('Usuario borrado', user);
     });
}

//Escuchar mensajes
export const message = (client: Socket, io: SocketIO.Server ) => {
     
     client.on('message', ( payload: { from:string, body:string } ) => {
          console.log('Mensaje recibido', payload);

          io.emit('message-new', payload );
     }); 
}

export const configUser = (client: Socket, io: SocketIO.Server ) => {

     client.on('config-user', ( payload: { name:string  }, callback: Function ) => {
          userListConnect.updateName(client.id, payload.name);

          callback({
               ok: true,
               msg: `Usuario ${payload.name}, configurado`
          });
     });   
}