const { response } = require('express')
const { Product } = require('../models')
const product = require('../models/product')



const getProducts = async (req, res =response)=>{

     const {limit = 5, them =0 } =  req.query
     const query = {status : true }

     const [total, products ] = await Promise.all([

        Product.countDocuments(query),
        Product.find(query)
            .populate('user','name')
            .populate('category','name')
            .skip(Number (them))
            .limit(Number (limit))
     ])

     res.json([
        total,
        products
     ])
}

const getProduct = async (req, res = response)=>{

    const { id } = req.params
    const product = await Product.findById(id).populate('user','name').populate('category','name')
    res.json(product)

}


const createProduct =async (req,res = response)=> {

    const name = req.body.name.toUpperCase()
    const productDB = await Product.findOne({name})
    const body = req.body

    if (productDB) {
        return res.status(400).json({
            msg: `the Product ${productDB.name} already exists`
        })
    }


    body.user = req.user._id

    

    const product = new Product (body)

    await product.save()

    console.log(req.test06102024)
    res.status(201).json(product)
}


const updateProduct = async(req,res = response)=>{

    const { id } = req.params
    const {status, user, ...data} = req.body
    data.name = data.name.toUpperCase()
    data.user = req.user._id
    
    const product = await Product.findByIdAndUpdate(id,data, {new: true})

    res.json(product)

}

const deleteProduct = async(req, res = response) => {
     const { id } = req.params
     const productDelete = await Product.findByIdAndUpdate(id, { status : false},  {new: true})

     res.json(productDelete)

}

module.exports = {

    createProduct,
    getProducts,
    getProduct,
    updateProduct,
   deleteProduct
}