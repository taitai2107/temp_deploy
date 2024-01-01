const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const hashPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};
const checkPassword = (mypassword, passworddb) => {
  return bcrypt.compareSync(mypassword, passworddb);
};
module.exports = {
  hashPassword,
  checkPassword,
};
