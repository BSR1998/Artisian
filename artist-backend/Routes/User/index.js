const express = require("express");
const path = require("path");
const multer = require('multer');

// Set up storage options
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../../static'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const { userLogin, userRegister, userProfile } = require("../../Controllers/User/index");

const user = express.Router();

user.post("/login", userLogin);
user.post("/register", userRegister);
user.post("/profile", upload.single('profile'), userProfile);

module.exports = user;
