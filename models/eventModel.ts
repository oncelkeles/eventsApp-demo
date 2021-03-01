import { Schema, model, Document, Model } from "mongoose";
import { Reservation } from "./reservationModel.js";

interface Location {
  city: String;
  venue: String;
}

interface EventInterface extends Document {
  title: String;
  description: String;
  startDate: String;
  duration: Number;
  ratingsAvg: Number;
  ratingsQuantity: Number;
  location: Location;
  price: Number;
  maxPeople: Number;
  seatsLeft: Number;
  imageCover: String;
}

//const EventSchemaFields =

const EventSchema = new Schema({
  title: {
    type: String,
    required: [true, "An event must have a title!"],
    unique: true,
  },
  description: {
    type: String,
    trim: true,
    required: [true, "A tour must have a summary"],
  },
  startDate: {
    type: Date,
    required: [true, "An event must have a start date!"],
  },
  duration: {
    type: Number,
    required: [true, "An event must a duration!"],
  },
  ratingsAvg: {
    type: Number,
    default: 3,
    min: [1, "Rating must be at least 1.0"],
    max: [5, "Rating must be at most 5.0"],
    set: (val: number) => Math.round(val * 10) / 10,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  location: {
    city: String,
    venue: String,
  },
  imageCover: {
    type: String,
    required: [true, "A tour must have a cover image"],
  },
  price: {
    type: Number,
    required: [true, "An event must have a price!"],
  },
  maxPeople: Number,
  seatsLeft: Number,
});

EventSchema.pre("remove", async function (next) {
  await Reservation.deleteMany({ event: this.id });
  next();
});

export const Event: Model<EventInterface> = model<EventInterface>(
  "Event",
  EventSchema
);
