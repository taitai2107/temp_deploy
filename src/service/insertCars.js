const cars = require("../../cars.json");
let arar = [1, 2, 3, 3, 4, 4, 4, 5, 6, 6];
let loc = (a) => Array.from(new Set(a));
console.log(loc(arar));

let car = Object.entries(cars);
console.log(car[1][0]);
const decode = (data) => {
  let string = "";
  data.split(" ").forEach((a) => {
    string += a[0];
  });
  string += data.length;
  return string;
};
module.exports = {
  decode,
};

// //==== awesomechat.js ====

// var express = require("express"),
//   app = express(),
//   server = require("http").createServer(app),
//   io = require("socket.io").listen(server),
//   users = {};
// server.listen(8888);
// app.use(express.static(__dirname + "/public"));
// app.get("/", function (req, res) {
//   res.sendfile(__dirname + "/views/chatui.html");
// });

// io.sockets.on("connection", function (socket) {
//   socket.on("new user", function (name, data) {
//     if (name in users) {
//       data(false);
//     } else {
//       data(true);
//       socket.nickname = name;
//       users[socket.nickname] = socket;
//       console.log("add nickName");
//       updateNickNames();
//     }
//   });

//   function updateNickNames() {
//     io.sockets.emit("usernames", Object.keys(users));
//   }
//   socket.on("open-chatbox", function (data) {
//     users[data].emit("openbox", { nick: socket.nickname });
//   });
//   socket.on("send message", function (data, sendto) {
//     users[sendto].emit("new message", {
//       msg: data,
//       nick: socket.nickname,
//       sendto: sendto,
//     });
//     users[socket.nickname].emit("new message", {
//       msg: data,
//       nick: socket.nickname,
//       sendto: sendto,
//     });

//     console.log(data);
//   });
//   socket.on("disconnect", function (data) {
//     if (!socket.nickname) return;
//     delete users[socket.nickname];
//     updateNickNames();
//   });
// });
