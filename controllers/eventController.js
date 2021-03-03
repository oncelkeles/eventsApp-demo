const fs = require("fs");
const { Buffer } = require("buffer");

const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const factory = require("./handlerFactory");
const { Event } = require("../models/eventModel");
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_BUCKET_NAME,
} = process.env;

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: "us-east-2",
});

const s3 = new AWS.S3({ params: { Bucket: AWS_BUCKET_NAME } });

exports.createEvent = factory.createOne(Event);

var storage1 = multer.diskStorage({
  //multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, "https://s3.amazonaws.com/" + AWS_BUCKET_NAME);
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(
      null,
      file.fieldname +
        "-" +
        datetimestamp +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  },
});

var uploadSingle = multer({
  //multer settings
  // storage: storage1
  storage: multerS3({
    s3: s3,
    bucket: AWS_BUCKET_NAME,
    acl: "public-read",
    key: function (req, file, cb) {
      var datetimestamp = Date.now();
      cb(
        null,
        file.fieldname +
          "-" +
          datetimestamp +
          "." +
          file.originalname.split(".")[file.originalname.split(".").length - 1]
      );
    },
  }),
}).single("file");

function getImageBuffer(base64) {
  const base64str = base64.replace(/^data:image\/\w+;base64,/, "");
  return Buffer.from(base64str, "base64");
}

exports.uploadImage = async (req, res, next) => {
  filePath = req.body.filePath;
  const path = require("path");
  const fileContent = fs.readFileSync(filePath);

  var name =
    path.basename(filePath) +
    "-" +
    Math.floor(10000000000 + Math.random() * 90000000000) +
    ".jpg";

  const params = {
    ACL: "public-read",
    Bucket: AWS_BUCKET_NAME,
    Key: name, // File name you want to save as in S3
    Body: fileContent,
  };

  // Uploading files to the bucket
  s3.upload(params, function (err, data) {
    if (err) {
      return err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
    req.body.imageCover = data.Location;
    req.body.filePath = undefined;
    next();
  });
};

exports.getAllEvents = factory.getAll(Event);
exports.updateEvent = factory.updateOne(Event);
exports.getEvent = factory.getOne(Event);

exports.deleteEvent = catchAsync(async (req, res, next) => {
  const doc = await Event.findById(req.params.id);

  if (!doc) {
    return next(new AppError("No document found by that ID!", 404));
  }

  doc.remove();

  res.status(204).json({
    status: "Success",
  });
});
