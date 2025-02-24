const { response, request, json } = require("express");
const bcrypt = require("bcryptjs");

const { User } = require("../models");
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
        ok:false
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
    return res.status(500).json({
      msg: "call to the admin",
      ok:false
    });
  }
};

const authGoogle = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, picture, email } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    if (!user) {
      const data = {
        name,
        email,
        password: ":P",
        google: true,
      };
      usuario = new User(data);

      await usuario.save();
    }

    if (!user.status) {
      return res.status(401).json({
        msg: "Hable con el adminsitrador usuario bloqueado",
        ok:false
      });
    }

    const token = await genJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "el token google no es valido",
      ok:false
    });
  }
};


const renovarToken = async(req,res = response )=> {

const { user } = req;

const token = await genJWT(user.id);

res.json ({
user,
token
}) 


} 


module.exports = {
  authPost,
  authGoogle,
  renovarToken
};
