const hashPassword = require("./hashpass");
const db = require("../models/index");
// const { hashPassword } = require("./hashpass");
const { Op, where } = require("sequelize");
var jwt = require("jsonwebtoken");
const { createToken } = require("../middleware/authAccount");
const createAccountTemp = async ({ username, password }) => {
  try {
    if (!username || !password) {
      return {
        message: "chưa điền tài khoản hoặc mật khẩu",
      };
    }
    const [user, create] = await db.account.findOrCreate({
      where: { username },
      defaults: {
        username,
        password: hashPassword.hashPassword(password),
      },
    });
    if (!create) {
      return {
        err: 1,
        message: "tài khoản đã tồn tại",
      };
    }
    if (create) {
      return {
        err: 0,
        message: "tạo tài khoản thành công",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      err: -1,
      message: "lỗi sever",
    };
  }
};
const handleLogin = async ({ valueInput, password }) => {
  try {
    let account = await db.User.findOne({
      where: {
        [Op.or]: [{ email: valueInput }, { phone: valueInput }],
      },
      include: [
        {
          model: db.group,
          include: {
            model: db.role,
          },
        },
      ],
    });
    if (!account) {
      return {
        EM: "Tài khoản không tồn tại",
        EC: 3,
        token: null,
      };
    }
    let payload = {
      id: account.dataValues.id,
      // username: account.dataValues.username,
      // groupId: account.dataValues.groupId,
      // group: account.dataValues.group,
    };
    let secretkey = process.env.ACCESS_TOKEN_SECRET;
    let expires = "1d";
    let token = createToken(payload, secretkey, expires);
    token = "Bearer " + token;
    if (hashPassword.checkPassword(password, account.password)) {
      return {
        EM: "Đăng nhập thành công",
        EC: 0,
        token: token,
      };
    } else {
      return {
        EM: "Tài khoản hoặc mật khẩu không đúng",
        EC: 2,
        token: null,
      };
    }
  } catch (error) {
    console.log("check e", error);
    throw {
      EM: "Lỗi server",
      EC: 1,
      token: null,
    };
  }
};
let handleCreateUser = async ({
  username,
  address,
  phone,
  sex,
  email,
  password,
}) => {
  try {
    const hashpass = hashPassword.hashPassword(password);
    const response = await db.User.create({
      username: username,
      address: address,
      phone: phone,
      sex: sex,
      email: email,
      password: hashpass,
      groupId: 3,
    });
    console.log(response.dataValues);
    let token = response.dataValues
      ? jwt.sign(
          {
            id: response.dataValues.id,
            username: response.dataValues.username,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "2d" }
        )
      : null;
    if (response) {
      return {
        EM: "Account created successfully",
        EC: 0,
        token,
      };
    }
  } catch (error) {
    // console.log(error);
    if (error.name === "SequelizeValidationError") {
      throw {
        EM: error.errors[0].message,
        EC: 1,
        token: null,
      };
    } else {
      throw { message: "Internal Server Error", code: 500, token: null };
    }
  }
};
let getPUser = async ({ id }) => {
  try {
    let user = await db.User.findByPk(id, {
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: db.group,
          include: {
            model: db.role,
          },
        },
      ],
    });
    console.log(user);
    if (!user)
      return {
        EC: 1,
        EM: "tài khoản không tồn tại",
      };
    if (user)
      return {
        EC: 0,
        EM: user,
      };
  } catch (error) {
    console.log(error);
    throw {
      EC: 1,
      EM: "lỗi",
    };
  }
};

const handleUpdateUser = async ({ id, username, password, email, phone }) => {
  try {
    const userId = id;
    // console.log("userId:", userId);
    const user = await db.User.findByPk(userId);
    if (!user) {
      return {
        EC: -1,
        EM: "Không thể tìm thấy người dùng",
      };
    }
    let updateUser = {
      username: username,
      email: email,
      phone: phone,
    };
    if (password) {
      const hashedPassword = hashPassword.hashPassword(password);
      updateUser.password = hashedPassword;
    }
    const update = await db.User.update(updateUser, {
      where: { id: userId },
    });
    // console.log("update:", update);
    if (update > 0) {
      return {
        EC: 0,
        EM: "Cập nhật tài khoản thành công",
      };
    } else {
      return {
        EC: -1,
        EM: "Không có bản ghi nào được cập nhật",
      };
    }
  } catch (error) {
    console.error(error);
    if (error.name == "SequelizeValidationError") {
      throw {
        EC: 2,
        EM: error.errors[0].message,
      };
    }
    throw {
      EC: 2,
      EM: "Lỗi server",
    };
  }
};
let deleteUser = async ({ id }) => {
  try {
    let userRole = await db.User.findOne({
      where: {
        id: id,
      },
      include: {
        model: db.group,
        include: {
          model: db.role,
        },
      },
    });
    let role = [];
    userRole.group.roles.forEach((a) => {
      role.push(a.url);
    });
    if (role.includes("/delete/user")) {
      console.log("có tồn tại");
    }
    if (!role.includes("/delete/user")) {
      console.log("không tồn tại");
    }
    console.log(role);
    // let delUser = await db.User.destroy({
    //   where: {
    //     id: id,
    //   },
    // });

    return {
      EC: 0,
      EM: "xóa thành công",
    };
  } catch (error) {
    console.log(error);
    throw {
      EC: -1,
      EM: "lỗi kết nối ",
    };
  }
};
let getUser = async ({ id }) => {
  try {
    let user = await db.User.findOne({
      where: { id: id },
      include: {
        model: db.group,
        include: {
          model: db.role,
        },
      },
    });

    if (!user) {
      return {
        EM: "id không tồn tại",
        EC: -1,
      };
    } else if (user) {
      let role = [];
      user.group.roles.forEach((a) => {
        role.push(a.url);
      });
      let name = user.group.name;
      let { username, address, phone, sex, email, password, groupId } = user;
      let realUser = {
        username,
        address,
        phone,
        sex,
        email,
        password,
        groupId,
        groupName: name,
        roles: role,
      };
      return {
        EM: realUser,
        EC: 1,
      };
    }
  } catch (error) {
    console.log(error);
    throw {
      EC: -1,
      EM: "error",
    };
  }
};
module.exports = {
  createAccountTemp,
  handleLogin,
  handleCreateUser,
  handleUpdateUser,
  getPUser,
  deleteUser,
  getUser,
};
