const { response } = require("express");
const { Usuario, Product, Category } = require("../models");
const { ObjectId } = require("mongoose").Types;


const collectionAvailable = ["user", "category", "product", "roles"];


const searchUser = async (item ='' , res = response)=>{

    const isMongoId = ObjectId.isValid(item)

    if (isMongoId){

        const user = await Usuario.findById(item)

        res.json({
            result : [ (user ) ? [user] : []]        
    })
    }        
     const regex = new RegExp(item, 'i')

     const usuario = await Usuario.find({
     $or : [{ name : regex }, {email : regex} , ],
     $and : [{ status : true}]
    })
     res.json({

      result : [
        usuario
      ]
     })

}

const searchCategory = async (item ='' ,res = response)=>{

  const isMongoId = ObjectId.isValid(item)

  if (isMongoId){

      const category = await Category.findById(item)

      res.json({
          result : [ (category ) ? [category] : []]        
  })
  }        
   const regex = new RegExp(item, 'i')

   const category = await Category.find({ name: regex, status: true  })
   res.json({

    result : [
      category
    ]
   })

}

const searchProducto = async (item ='' , res = response)=>{

  const isMongoId = ObjectId.isValid(item)

  if (isMongoId){

      const product = await  Product.findById(item)

      res.json({
          result : [ (product ) ? [product] : []]        
  })
  }        
   const regex = new RegExp(item, 'i')

   const product = await Product.find( {name: regex, status: true}).populate('category', 'name')
   res.json({

    result : [
      product
    ]
   })

}




const search = (req, res = response) => {
  const { collection, item } = req.params;

  
  if (!collectionAvailable.includes(collection)) {
    return res.status(400).json({
      msg: `collection ${collection} is not permited`,
    });
  }

  switch (collection) {
    case 'user':
        searchUser(item, res)
        break;
    case 'category':
        searchCategory(item, res)
        break;
    case 'product':
        searchProducto(item,res)
        break;
    
    default:
        break;
  }

};

module.exports = {
  search,
};
