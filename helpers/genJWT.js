const jwt = require("jsonwebtoken");
const { User } = require('../models')


const genJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.PVKEY ,

      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("no se pudo gen el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};


const checkJWT =async (token='')=>{
try {
  if (token < 10 ){
    return null;
  }
const {uid}  = jwt.verify( token, process.env.PVKEY)

const user = await User.findById( uid)

  if (user){
    return user
    }else{
    console.log('posiblementte error en el token')
    return null
    }

} catch (error) {
console.log(error)
  return null
}
}

module.exports = {
  genJWT,
  checkJWT
};
