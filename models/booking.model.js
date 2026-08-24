import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: [true, "room id is needed"],
  },
  guestName: {
    type: String,
    required: [true, "guest name is needed"],
    minLength: 1,
  },
  phone: {
    type: String,
    required: [true, "phone number needed"],
    minLength: 10,
  },
  check_in: {
    type: Date,
    required: [true, "check in date is needed"],
  },
  check_out: {
    type: Date,
    required: [true, "check out date is needed"],
    validate: {
      validator: function (value) {
        return value > this.check_in;
      },
      message: "check out date cannot be before check in date",
    },
  },
});

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;
