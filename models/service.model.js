import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: [true, "booking id is needed"],
  },
  menuItems: [
    {
      name: {
        type: String,
        required: [true, "item name is required"],
      },
      qty: {
        type: Number,
        required: [true, "quantity is required"],
        min: 1,
      },
    },
  ],
  status: {
    type: String,
    enum: ["pending", "delivered", "cancelled"],
    default: "pending",
  },
});

const Service = mongoose.model("Service", ServiceSchema);
export default Service;
