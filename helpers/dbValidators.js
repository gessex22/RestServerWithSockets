const { default: mongoose } = require("mongoose");
const Role = require("../models/role");
const User = require("../models/user");
const moongose =require('mongoose');
const { Category } = require("../models");

const isRole = async (rol = "") => {
  const existRol = await Role.findOne({ rol });
  if (!existRol) {
    throw new Error(`El rol ${rol} no esta registrado en la bd`);
  }
};

const isExist = async ( email = '') =>{

    const exist = await User.findOne({email}) 
    if (exist){
        throw new Error (`El correo: ${email} ya esta en la bd `)
    }
}

const isUser = async( user)=>{

  if( mongoose.Types.ObjectId.isValid(user)){
    const exist = await User.findById({_id:user})
  if (!exist){
    throw new Error ('El user id no es valido')
  }
  console.log('evalido mmgb' + user)
  }

  
}

const categoryExist = async (id)=>{

  const categoryExist = await  Category.findById(id)
  if (!categoryExist) {
    throw new Error (`El id no existe ${id}`);
  }

}

const allowedColletions =  async( collection ='', collectionAllow = [] ) =>{



  const exist = collectionAllow.includes(collection)
  if (!exist ){
    throw new Error (`collection is not allowed ${collectionAllow}`)
  }
  return true
}

module.exports = {
  isRole,
  isExist,
  isUser,
  categoryExist,
  allowedColletions
};
