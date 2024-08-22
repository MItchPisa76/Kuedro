const io = require('socket.io-client');
const socketClient = io.connect("http://"+process.env.CODESPACE_NAME); // Specify port if your express server is not using default port 80

console.log("http://"+process.env.CODESPACE_NAME);

socketClient.on('connect', () => {
  socketClient.emit('npmStop');
  setTimeout(() => {
    process.exit(0);
  }, 1000);
});