const { response, request, json } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user.js");
const { validationResult } = require("express-validator");
const { genJWT } = require("../helpers/genJWT.js");
const { googleVerify } = require("../helpers/googleVerify.js");

// const userGet = async (req, res = response) => {
//   const { nombre = "undefined", apkey, limit = 5, skip = 0 } = req.query;
//   const query = { status: true };

//   const [total, users] = await Promise.all([
//     User.count(query),
//     User.find(query).skip(Number(skip)).limit(Number(limit)),
//   ]);

//   res.json({
//     total,
//     users,
//   });
// };

const authPost = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    //validate email

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "Usuario no encontrado e00021",
      });
    }

    //status user

    if (!user.status) {
      return res.status(400).json({
        msg: "Usuario no encontrado e000022",
      });
    }
    //validate password

    if (!password === bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({
        msg: "Wrong credentials e000023",
      });
    }
    //gen jwt

    const token = await genJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "call to the admin",
    });
  }
};

const authGoogle = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, picture, email } = await googleVerify(id_token);

    let usuario = await User.findOne({ email });

    if (!usuario) {
      const data = {
        name,
        email,
        password: ":P",
        google: true,
      };
      usuario = new User(data);

      await usuario.save();
    }

    if (!usuario.status) {
      return res.status(401).json({
        msg: "Hable con el adminsitrador usuario bloqueado",
      });
    }

    const token = await genJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "el token google no es valido",
    });
  }
};

module.exports = {
  authPost,
  authGoogle,
};
