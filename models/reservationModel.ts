import { Schema, model, Document, Types, Model } from "mongoose";

type ID = Types.ObjectId;

interface ReservationInterface extends Document {
  price: Number;
  user: ID;
  event: ID;
  createdAt: Date;
}

export const ReservationSchema: Schema<ReservationInterface> = new Schema({
  price: {
    type: Number,
    required: [true, "A rezervation must have a price!"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A rezervation must belong to a user!"],
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: "Event",
    required: [true, "A rezervation must belong to an event!"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

ReservationSchema.pre<ReservationInterface>(/^find/, function (next) {
  this.populate("user").populate("event");
  next();
});

export const Reservation: Model<ReservationInterface> = model<ReservationInterface>(
  "Reservation",
  ReservationSchema
);
