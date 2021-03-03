const express = require("express");

const eventController = require("../controllers/eventController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(eventController.getAllEvents)
  .post(
    authController.protectRoute,
    authController.restrict("admin"),
    eventController.uploadImage,
    eventController.createEvent
  );

router
  .route("/:id")
  .get(eventController.getEvent)
  .delete(
    authController.protectRoute,
    authController.restrict("admin"),
    eventController.deleteEvent
  )
  .patch(
    authController.protectRoute,
    authController.restrict("admin"),
    eventController.updateEvent
  );

module.exports = router;
