const express = require("express"); //NOTE servidor de Express
const http = require("http"); //NOTE servidor de socket.io
const socketio = require("socket.io"); //NOTE configuracion de socket server
const path = require("path"); //NOTE para manejar rutas
const Sockets = require("./sockets");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    //http server
    this.server = http.createServer(this.app);
    this.io = socketio(this.server);
  }

  middlewares() {
    //NOTE desplegar el directorio publico
    this.app.use(express.static(path.resolve(__dirname , "../public")));
  }

  configureSocket() {
      new Sockets(this.io);
  }

  execute() {
    this.middlewares(); //inicializar middlewares
    this.configureSocket(); //inicializar socket
    //inicializar servidor
    this.server.listen(this.port, () =>
      console.log("Servidor corriendo en el puerto:", this.port)
    );
  }
}

module.exports = Server;
