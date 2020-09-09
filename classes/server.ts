import Express from 'express';
import { SERVER_PORT } from '../global/environment';
import SocketIO from 'socket.io';
import Http from 'http';

import * as Socket from '../sockets/socket';

export default class Server {

     private static _instance: Server;

     public app: Express.Application;
     public port: number;

     public io: SocketIO.Server;
     private httpServer: Http.Server; 

     private constructor(){
          this.app = Express();
          this.port = SERVER_PORT;

          this.httpServer = new Http.Server( this.app );
          this.io = SocketIO( this.httpServer );

          this.listenSockets();
     }

     public static get instance(){
          return this._instance || ( this._instance = new this() );
     }

     private listenSockets(){
          console.log('Escuchando conexiones - sockets');

          this.io.on('connection', client =>{
               console.log('Cliente conectado');

               //Desconectar
               Socket.disconnect( client ); 
               
               //Mensajes
               Socket.message( client, this.io );
          });          
     }

     start( callback: any ){
          this.httpServer.listen( this.port, callback );
     }
}