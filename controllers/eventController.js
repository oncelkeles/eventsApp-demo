const factory = require("./handlerFactory");
const { Event } = require("../models/eventModel");
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

exports.createEvent = factory.createOne(Event);
exports.getAllEvents = factory.getAll(Event);
//exports.deleteEvent = factory.deleteOne(Event);
exports.updateEvent = factory.updateOne(Event);
exports.getEvent = factory.getOne(Event);

exports.deleteEvent = catchAsync(async (req, res, next) => {
  const doc = await Event.findById(req.params.id);

  //const doc = await Event.findByIdAndRemove(req.params.id);

  if (!doc) {
    return next(new AppError("No document found by that ID!", 404));
  }

  doc.remove();

  res.status(204).json({
    status: "Success",
  });
});
