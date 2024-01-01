const promisePool = require("../config/db");
const tempdata = require("../temp/datafake");
// const hashPassword = require("../service/userHashPassword");

let getUser = async (req, res) => {
  const [rows, fields] = await promisePool.query("select * from users");
  let totalId = tinhtongID(rows);
  let temp = { rows };
  res.json(
    //temp.rows
    temp.rows
  );
};
let createUser = async (req, res) => {
  //INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country) VALUES
  await promisePool.query(
    "insert into users (firstname,lastname,email,address) values (?,?,?,?)",
    [req.body.firstname, req.body.lastname, req.body.email, req.body.address]
  );
  res.json({
    message: "thêm mới thành công",
  });
};
let tinhtongID = (arr) => {
  let sum = 0;
  arr.forEach((a) => {
    sum += a.id;
  });
  return sum;
};
let getDatafake = (req, res) => {
  res.json(tempdata.book);
};
let deleteUser = async (req, res) => {
  //DELETE FROM Customers WHERE CustomerName='Alfreds Futterkiste';
  await promisePool.query("delete from users where firstname = ?", [
    req.body.firstname,
  ]);
  res.json({
    message: "xóa thành công",
  });
};
let updateUser = async (req, res) => {
  let { firstname, lastname, email, address, id } = req.body;
  await promisePool.query(
    "update users set firstname=?,lastname=?,email=?,address=? where id = ?",
    [firstname, lastname, email, address, id]
  );
  res.json({
    message: "sửa thành công ",
  });
};
let sumPrice = (req, res) => {
  let sum = 0;
  tempdata.book.forEach((a) => {
    sum += a.price;
  });
  res.json({
    message: sum,
  });
};

module.exports = {
  getUser,
  getDatafake,
  createUser,
  deleteUser,
  updateUser,
  sumPrice,
};
