class Sockets {
  constructor(io) {
    this.io = io;
    this.socketsEvents();
  }

  socketsEvents() {
    // conexion al socket
    this.io.on("connection", (socket) => {
        console.log("Nueva conexion al socket");
      socket.on("message-to-server", (sock) => {
        console.log(sock);
        this.io.emit("message-from-server", sock);
      });
    });
  }
}

module.exports = Sockets;
