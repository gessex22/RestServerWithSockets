const {Schema, model} = require('mongoose')



const ProductSchema = Schema({

   name:{
    type: String,
    required: [true, 'El nombre es obligatorio'],
    unique :  true
   },
   status :{
    type : Boolean,
    default : true,
    required : true

   },
   user: {
    type : Schema.Types.ObjectId,
    ref: 'User',
    required: true
   },
   cost: {
    type : Number,
    default : 0,
   },
   category : {
    type : Schema.Types.ObjectId,
    ref : 'Category',
    required : true
   },
   descricion : {type: String},
   inStock : {type: Boolean, default: true
    
   },
   img: {
    type: String
   }

})


ProductSchema.methods.toJSON = function() {

    const {__v, status, ...data } = this.toObject()
    return data
}


module.exports= model('Product', ProductSchema)