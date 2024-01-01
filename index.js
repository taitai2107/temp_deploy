const express = require("express");
const app = express();
const configCors = require("./src/config/CORS");
require("express-async-errors");
const useRouter = require("./src/router/index");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
// app.use("/", (req, res) => {
//   return res.send("Middleware applied to every request");
// });
configCors(app);
const testConnect = require("./src/config/connectsq");
testConnect();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
useRouter(app);
app.use("/", (req, res) => {
  res.send("OK");
});
// app.use((req, res) => {
//   res.json("router not found");
// });
app.listen(PORT, () => {
  console.log(`sever is running on PORT ${PORT}`);
});
