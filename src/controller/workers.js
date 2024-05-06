// exports.register = (req, res, next)=>{
//   res.json({
//     data: 'register'
//   })
// }
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
// const uu
const createHttpError = require("http-errors");
const usersModel = require("../models/users");
const workersModel = require("../models/workers");
const { response } = require("../helper/common");

// module.exports = {
//   register: (req, res, next)=>{

//   }
// }

const register = async (req, res, next) => {
  try {
    const { email, password, phone, name } = req.body;

    const {
      rows: [user],
    } = await usersModel.findByemail(email);
    if (user) {
      return next(createHttpError(403, "User Sudah terdaftar"));
    }

    const salt = bcrypt.genSaltSync(10);
    console.log('salt ->', salt);
    const passwordHash = bcrypt.hashSync(password, salt);
    // const passwordHash = bcrypt.hashSync(password, 10);
    const dataUser = {
      id: uuidv4(),
      email,
      password: passwordHash,
      role: "worker",
    };

    const dataWorker = {
      id: uuidv4(),
      name,
      phone,
      userId: dataUser.id,
    };

    await usersModel.create(dataUser);
    await workersModel.register(dataWorker);
    response(res, null, 201, "user berhasil register");
  } catch (error) {
    console.log(error);
    next(new createHttpError.InternalServerError())
  }
};

module.exports = {
  register,
};
