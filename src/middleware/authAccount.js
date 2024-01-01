const db = require("../models/index");
// const { hashPassword } = require("./hashpass");
const { Op, where } = require("sequelize");
var jwt = require("jsonwebtoken");
let verifyToken = (req, res, next) => {
  let token = req.headers.authorization;
  console.log(token);
  if (!token)
    return res.json({
      EC: 2,
      EM: "bạn phải đăng nhập để sử dụng chức năng này",
    });
  let accessToken = token.split(" ")[1];
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.error("JWT Verify Error:", err);
    if (err)
      return res.json({
        EC: 2,
        EM: "token đã hết hạn hoặc không đúng",
      });
    req.user = user;
    console.log("check", req.user);
    next();
  });
};
let findGroupNameById = async (id) => {
  try {
    let user = await db.User.findOne({
      where: {
        id: id,
      },
      include: {
        model: db.group,
      },
    });

    if (user && user.group) {
      return user.group.name;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

let isAdmin = async (req, res, next) => {
  let name = await findGroupNameById(req.user.id);
  console.log(name);
  // let { name } = req.user.group;
  if (name !== "admin") {
    return res.json({
      EC: -1,
      EM: "bạn không đủ quyền truy cập chức năng này",
    });
  }
  next();
};

let isDev = async (req, res, next) => {
  let name = await findGroupNameById(req.user.id);
  // let { name } = req.user.group;
  if (name == "user") {
    return res.json({
      EC: -1,
      EM: "bạn không đủ quyền để sử dụng chức năng",
    });
  }
  next();
};
const createToken = (payload, secretKey, expires) => {
  try {
    const token = jwt.sign(payload, secretKey, { expiresIn: expires });
    return token;
  } catch (error) {
    console.error("Error creating token:", error);
    throw new Error("Failed to create token");
  }
};
module.exports = {
  verifyToken,
  isAdmin,
  isDev,
  createToken,
};
