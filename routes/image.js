var express = require('express');
var router = express.Router();

const knex = require('../db/knex');


const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");



cloudinary.config({
cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
api_key: process.env.CLOUDINARY_API_KEY,
api_secret: process.env.CLOUDINARY_API_SECRET
});


const storage = cloudinaryStorage({
cloudinary: cloudinary,
folder: "lulueats",
allowedFormats: ["jpg", "png"],
//transformation: [{ width: 500, height: 500, crop: "limit" }]
});
const parser = multer({ storage: storage });

router.post('/', parser.single("image"), function(req, res, next) {


  const image = {};
  image.image_url = req.file.url;
  image.image_id = req.file.public_id;
  image.name = req.file.originalname;

  knex('image')
    .insert(image, 'id')
    .then(() => {
       res.status(200);
       res.json(image);

    }).catch(function(error) {
        console.log(error);
        res.status(500);
        res.json({});
    });

});

module.exports = router;
