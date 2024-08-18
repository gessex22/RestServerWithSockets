const { Router } = require("express");
const { check } = require("express-validator");

const { validarJWT, validateFields, esAdminRole } = require("../middleware");
const { categoryExist } = require("../helpers/dbValidators");
const { getProduct, createProduct, updateProduct, deleteProduct, getProducts } = require("../controllers/productController");

const router = Router();

router.get("/", [],getProducts);


router.get("/:id", [
  check('id','is not a mongoid true').isMongoId(),
  check('id').custom(categoryExist),
  validateFields,

], getProduct);



router.post("/",
    [
    validarJWT,
    check("name", "El name es required").notEmpty(),
    check("category", "category of product required").notEmpty(),
    check('category').custom(categoryExist),

     validateFields],

  createProduct
);

router.put("/:id",[
  validarJWT,
  check('name','Name is required').notEmpty(),
  check('category').custom(categoryExist),
validateFields 
],updateProduct);


router.delete("/:id", [
  validarJWT,
  esAdminRole,
  check('id','is not a mongoid true').isMongoId(),
  check('id').custom(categoryExist),
  validateFields 
  

], deleteProduct);

module.exports = router;
