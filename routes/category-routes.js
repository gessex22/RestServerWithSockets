const { Router } = require("express");
const { check } = require("express-validator");

const { validarJWT, validateFields, esAdminRole } = require("../middleware");
const { createCategory, getCategory, getCategories, updateCategory, deleteCategory } = require("../controllers/categoryController");
const { categoryExist } = require("../helpers/dbValidators");

const router = Router();

router.get("/", [],getCategories);


router.get("/:id", [
  check('id','is not a mongoid true').isMongoId(),
  check('id').custom(categoryExist),
  validateFields,

], getCategory);



router.post(
  "/",
  [validarJWT, check("name", "El name es required").notEmpty(), validateFields],
  createCategory
);

router.put("/:id",[
  validarJWT,
  check('name','Name is required').notEmpty(),
  check('id').custom(categoryExist),
validateFields 
],updateCategory);


router.delete("/:id", [
  validarJWT,
  esAdminRole,
  check('id','is not a mongoid true').isMongoId(),
  check('id').custom(categoryExist),
  validateFields 
  

], deleteCategory);

module.exports = router;
