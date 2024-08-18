const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user.js");
const { validationResult } = require("express-validator");

const userGet = async (req, res = response) => {
  const { nombre = "undefined", apkey, limit = 5, skip = 0 } = req.query;
  const query = { status: true };

  const [total, users] = await Promise.all([
    User.count(query),
    User.find(query).skip(Number(skip)).limit(Number(limit)),
  ]);

  res.json({
    total,
    users,
  });
};

const userPut = async (req, res = response) => {
  const { userId } = req.params;
  const { password, google, ...rest } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync(password, salt);
  }

  const userInfo = await User.findByIdAndUpdate(userId, rest);

  res.status(500).json({
    msg: "put - api - controller",
    userInfo,
  });
};
const userDel = async (req, res = response) => {

  const { userId } = req.params
  const uid = req.uid

  const user =  await User.findByIdAndUpdate(userId,{status: false})
  const userLogged = req.user



  res.json({
  user,
  uid
  });
};


const userPost = async (req, res = response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors });
  }

  const { name, email, password, rol } = req.body;
  const user = new User({ name, email, password, rol });
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  await user.save();

  res.status(201).json({
    msg: "post - api - controller",
    user,
  });
};

const userPatch = (req, res = response) => {
  res.json({
    msg: "path - api - controller",
  });
};

module.exports = {
  userGet,
  userPut,
  userDel,
  userPost,
  userPatch,
};
