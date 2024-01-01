const db = require("../models/index");
// const { hashPassword } = require("./hashpass");
const { Op, where } = require("sequelize");
var jwt = require("jsonwebtoken");
const hashPassword = require("../service/hashpass");
const { deleteAccount } = require("../controller/apiAccountController");
const fielData = (data) => {
  const fieldUpdate = [];
  if (data.username) fieldUpdate.push("username");
  if (data.phone) fieldUpdate.push("phone");
  if (data.email) fieldUpdate.push("email");
  if (data.password) fieldUpdate.push("password");
  return fieldUpdate;
};
let validateUpdate = async (req, res, next) => {
  let { id, ...updateUser } = req.body;
  // console.log(updateUser.password);
  console.log(typeof id);
  console.log(typeof updateUser);
  const allowedFields = ["username", "phone", "email", "password", "id"];
  if (!id)
    return res.status(500).json({
      EC: -1,
      EM: "chưa điền id cần sửa",
    });
  if (updateUser.password) {
    let User = await db.User.findByPk(id);
    let oldPassWord = User.dataValues.password;
    let newPassWord = updateUser.password;
    if (hashPassword.checkPassword(newPassWord, oldPassWord)) {
      return res.status(500).json({
        EC: -1,
        EM: "mật khẩu chưa được thay đổi",
      });
    }
  }
  let fieldUpdate = fielData(updateUser);
  // console.log(req.body);
  // console.log(fieldUpdate);
  if (fieldUpdate.length == 0) {
    return res.status(500).json({
      EC: -1,
      EM: "không có trường nào được cập nhật",
    });
  }
  let body = req.body;
  if (!Object.keys(body).every((a) => allowedFields.includes(a))) {
    return res.status(500).json({
      EC: -1,
      EM: "không được cập nhật các trường khác",
    });
  }
  // console.log(fieldUpdate);
  req.fieldUpdate = fieldUpdate;
  next();
};
let middlewareDeleteUser = async (req, res, next) => {
  let { id } = req.body;
  if (!id) {
    return res.status(500).json({
      EC: -1,
      EM: "bạn chưa điền id",
    });
  }
  let user = await db.User.findByPk(id);
  if (!user) {
    return res.status(500).json({
      EC: -1,
      EM: "tài khoản muốn xóa không tồn tại",
    });
  }
  // console.log(user);
  next();
};

module.exports = {
  validateUpdate,
  middlewareDeleteUser,
};
