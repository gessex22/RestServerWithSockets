const { response, json } = require("express");
const { uploadFileH } = require("../helpers/uploadFileHelper")
const { Usuario, Product } = require('../models')
const path = require('path')
const fs = require('fs')


const uploadFile = async (req ,res = response)=>{
    
  //  if ( !req.files || Object.keys(req.files).length === 0 || !req.files.clientFile ){
  //    return res.status(400).json({msg: `No files uploaded`})
  //  }

  
   try {
   
    const completPath = await uploadFileH(req.files, undefined)
     res.json({
      'path'  : completPath
      })

   } catch (error) {
    res.status(401).json({

      err : `erro try moved to path`
    })
   }
   
}


const updateFile = async (req,res=response) =>{


  const { id, collection } = req.params

  let model

  switch (collection) {
    case 'users':
       model = await Usuario.findById(id)
       if (!model){
        return res.status(400).json({
          msg: 'User not found'
        })
       }
      break;
    case 'products':
       model = await Product.findById(id)
       if (!model ){
        return res.status(400).json({
          msg: 'Product not found'
        })
       }

      break
  
    default:
      return res.status(500).json({
        msg: 'Esto no esta validado'
      })      
  }
  //delete img prev 
  if( model.img){
const pathImage = path.join( __dirname, '../uploads', collection, model.img)
//console.log(pathImage)
    if ( fs.existsSync(pathImage)) {
      fs.unlinkSync(pathImage)
     }
    
  }


  try {
    const nameImg = await uploadFileH(req.files , undefined, collection)
    model.img = nameImg
    const modelUpdate = await model.save()
    res.json({

      msg: 'todo ok',
      id,
      collection,
      modelUpdate
      
        })
      

  } catch (error) {
    console.log(error),
    res.status(401).json({msg: `extension is not allowed`})
  }
 

    

}


const getFile = async (req, res = response) => {

  const {collection, id } = req.params 

  let model

  switch (collection) {
    case 'users':
       model = await Usuario.findById(id)
       if (!model){
        return res.status(400).json({
          msg: 'User not found'
        })
       }
      break;
    case 'products':
       model = await Product.findById(id)
       if (!model ){
        return res.status(400).json({
          msg: 'Product not found'
        })
       }

      break
  
    default:
      return res.status(500).json({
        msg: 'Esto no esta validado'
      })      
  }

  if( model.img){
    const pathImage = path.join( __dirname, '../uploads', collection, model.img)
    //console.log(pathImage)
        if ( fs.existsSync(pathImage)) {
          return res.sendFile(pathImage)
         }
        
      }


  res.sendFile(path.join(__dirname , '../uploads' , 'placeholder-img.png'))
  

}

module.exports = {
  uploadFile,
  updateFile,
  getFile
};
