import Booking from "../models/booking.model.js";
import Room from "../models/room.model.js";

export const createRoom = async (req, res, next) => {
  try {
    const { roomNum, type, pricePerNight } = req.body;
    const newRoom = await Room.create({ roomNum, type, pricePerNight });
    res.status(201).json({
      success: true,
      data: newRoom,
      message: "Room created succesfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find({});

    res.status(200).json({
      success: true,
      message: "All rooms fetched succesfully",
      data: rooms,
    });
  } catch (error) {
    next(error);
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const roomNum = req.params.roomNum;
    const room = await Room.findOne({ roomNum: roomNum });
    if (room) {
      res.status(200).json({
        success: true,
        message: "room fetched succesfully",
        data: room,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "id doesnt exist",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const { roomNum } = req.params;
    const { type, pricePerNight } = req.body;

    const updatedRoom = await Room.findOneAndUpdate(
      { roomNum },
      { type, pricePerNight },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!updatedRoom) {
      const error = new Error("room not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "room updated successfully",
      data: updatedRoom,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (req, res, next) => {
  try {
    const { roomNum } = req.params;
    const deletedRoom = await Room.findOneAndDelete({ roomNum });
    if (!deletedRoom) {
      const error = new Error("room not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: "room deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const availableRooms = async (req, res, next) => {
  try {
    const { check_in, check_out } = req.query;
    if (!check_in || !check_out) {
      return res.status(422).json({
        success: false,
        message: "both checkin and checkout dates are compulsory",
      });
    }
    const time_in = Date.parse(check_in);
    const time_out = Date.parse(check_out);

    if (isNaN(time_in) || isNaN(time_out)) {
      return res.status(400).json({
        success: false,
        message: "incorrect format of date",
      });
    }
    const validated_check_in = new Date(time_in);
    const validated_check_out = new Date(time_out);
    // unlike the booking.controller.js where i used plain js logic to check if it overlaps or not, it becomes very difficult here when we talk about scalability apparently ? so i asked claude for an alternative solution and apparently there is something like $lt $gt $nin and other stuff which is called query params (not rlly sure about the name), so ill be using that here along with mongoose's inbuilt .distinct function, cause the pure js code would go way too crazy
    const unavailableIds = await Booking.distinct("room_id", {
      check_in: { $lt: validated_check_out },
      check_out: { $gt: validated_check_in },
    });
    const availableRooms = await Room.find({
      _id: { $nin: unavailableIds },
    });

    if (availableRooms.length == 0) {
      res.status(200).json({
        success: true,
        message: "No rooms found in the given timeframe",
        data: availableRooms,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Rooms found in the given timeframe",
        data: availableRooms,
      });
    }
  } catch (error) {
    next(error);
  }
};
