"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const mongoose_1 = require("mongoose");
const reservationModel_js_1 = require("./reservationModel.js");
//const EventSchemaFields =
const EventSchema = new mongoose_1.Schema({
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
        set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
        type: Number,
        default: 0,
    },
    location: {
        city: String,
        venue: String,
    },
    price: {
        type: Number,
        required: [true, "An event must have a price!"],
    },
    maxPeople: Number,
});
EventSchema.pre("remove", async function (next) {
    await reservationModel_js_1.Reservation.deleteMany({ event: this.id });
    next();
});
exports.Event = mongoose_1.model("Event", EventSchema);
