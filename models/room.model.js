import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  roomNum: {
    type: Number,
    unique: true,
    required: [true, "Room number is required"],
  },
  type: {
    type: String,
    enum: ["single", "double", "deluxe", "suite"],
    default: "single",
    required: [true, "Room ID is required"],
  },
  pricePerNight: {
    type: Number,
    required: [true, "price per night is required "],
  },
});

const Room = mongoose.model("Room", RoomSchema);

export default Room;
