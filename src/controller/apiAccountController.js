const promisePool = require("../config/db");
const hashPassword = require("../service/hashpass");
const db = require("../models/index");
// const { Op } = require("sequelize");
const SeverError = require("../error/ErrrorServer");
const serviceAuth = require("../service/auth");
const { authPlugins } = require("mysql2");

// const middleware = require("../middleware/validateUser");
const createAccount = async (req, res) => {
  try {
    const result = await serviceAuth.handleCreateUser(req.body);

    res.json(result);

    console.log(result);
  } catch (e) {
    // res.status(500).json({
    //   EM: "lỗi sever",
    //   EC: 500,
    // });
    throw new SeverError(e);
  }
};

const login = async (req, res) => {
  try {
    const response = await serviceAuth.handleLogin(req.body);
    console.log(response);
    res.json(response);
  } catch (error) {
    console.log("lỗi sever: ", error);
    res.status(404).json(error);
  }
};
let getAll = async (req, res) => {
  let accounts = await db.account.findAll();
  res.json(accounts);
};
let deleteAccount = async (req, res) => {
  try {
    let del = await serviceAuth.deleteUser(req.body);
    res.json(del);
  } catch (error) {
    res.json(error);
  }
};

let reqAccount = () => {
  res.json({
    message: "test",
    data: "test api",
  });
};
let createUser = async (req, res) => {
  let { username, password } = req.body;
  let hashpass = hashPassword.hashPassword(password);
  await db.User.create({ username: username, password: hashpass });
  res.json({
    message: "ok",
  });
};
let findUser = async (req, res) => {
  // test quan hệ
  let { idt } = req.body;
  const user = await db.User.findOne({
    include: { model: db.group, attributes: ["name", "description"] },
    attributes: ["username", "sex", "email"],
    where: { id: idt },
    raw: true,
    nest: true,
  });
  const role = await db.group.findAll({
    where: { id: idt },
    include: {
      model: db.role,
      attributes: ["url", "description"], // Chỉ định các trường muốn lấy
      through: {
        // model: db.groupRole,
        attributes: [],
      },
    },

    attributes: ["name"],
    raw: true,
    nest: true,
  });
  console.log(role);
  // console.log(user);
  // const data = [];
  // role.forEach((a) => {
  //   data.push(a);
  // });
  // data.push(user);
  // const rolesData = data.filter((item) => item.roles);
  // const rolesObject = {};

  // rolesData.forEach((item, index) => {
  //   rolesObject[`roles${index + 1}`] = item.roles.description;
  // });

  // const userObject = {
  //   username: data.find((item) => item.username).username,
  //   sex: data.find((item) => item.sex)?.sex || "",
  //   email: data.find((item) => item.email)?.email || "",
  //   possition: data.find((item) => item.name)?.name || "",
  //   ...rolesObject,
  // };

  let getUser = await db.User.findOne({
    include: [
      {
        model: db.group,
        attributes: ["name"],
        include: {
          model: db.role,
          attributes: ["description"],
          through: {
            model: db.groupRole,
            attributes: [],
          },
        },
      },
    ],
    attributes: ["username", "phone"],
    where: { id: idt },
    raw: true,
    nest: true,
  });
  // const q = getUser.group;
  // const w = q.roles;
  // const e = w.description;
  // console.log(e);

  // console.log(role);

  // console.log(userObject);
  // const roleId = role[0].name; // Lấy ra id của vai trò

  // const roleList = [];
  // role.forEach((a) => {
  //   roleList.push(a.roles);
  // });

  // console.log("Role ID:", roleId);
  // console.log("Role List:", roleList);
  // const user = await db.User.findByPk(2, {
  //   include: [
  //     {
  //       model: db.group,
  //       include: {
  //         model: db.role,
  //         through: {
  //           model: db.groupRole,
  //           attributes: [],
  //         },
  //       },
  //     },
  //   ],
  //   raw: true,
  //   nest: true,
  // });
  // let pointUser = [
  //   "nameUser",
  //   user.username,
  //   "address",
  //   user.address,
  //   "phone",
  //   user.phone,
  //   "position",
  //   user.group.name,
  //   // "permission",
  //   // user.group.roles.description,
  // ];
  // let toObj = {};
  // for (let i = 0; i < pointUser.length; i += 2) {
  //   let key = pointUser[i];
  //   let value = pointUser[i + 1];
  //   toObj[key] = value;
  // }

  // console.log(toObj);
  // console.log(user);
  // console.log(pointUser);
  // console.log("check user :", user);
  // console.log("check role :", role);

  res.json({
    message: "ok",
    // data: toObj,
    data: role,
  });
};
let creatTemp = async (req, res) => {
  try {
    const re = await serviceAuth.createAccountTemp(req.body);
    res.json(re);
  } catch (e) {
    console.log(e);
    res.json({
      err: -1,
      message: "lỗi sever",
    });
  }
};
const validate = async (req, res, next) => {
  try {
    let { id } = req.body;
    let account = await db.User.findOne({
      where: {
        id: id,
      },
    });
    if (!account) {
      return res.status(404).json({
        message: "Không tìm thấy tài khoản",
      });
    }
    next();
  } catch (error) {
    console.error("Lỗi khi kiểm tra tài khoản:", error);
    return res.status(500).json({
      message: "Lỗi server",
    });
  }
};
let getProfileUser = async (req, res) => {
  try {
    let user = await serviceAuth.getPUser(req.user);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
};
let updateUser = async (req, res) => {
  try {
    // console.log(req.body);
    const update = await serviceAuth.handleUpdateUser(req.body);

    res.json(update);
  } catch (error) {
    res.json(error);
  }
};
let getUser = async (req, res) => {
  try {
    let user = await serviceAuth.getUser(req.body);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
};
module.exports = {
  createAccount,
  login,
  getAll,
  deleteAccount,
  updateUser,
  reqAccount,
  createUser,
  findUser,
  creatTemp,
  validate,
  getProfileUser,
  getUser,
};
