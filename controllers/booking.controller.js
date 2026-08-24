import Booking from "../models/booking.model.js";
import Room from "../models/room.model.js";
export const createBooking = async (req, res, next) => {
  try {
    const { roomNum, guestName, phone, check_in, check_out } = req.body;
    if (!roomNum || !guestName || !phone || !check_in || !check_out) {
      return res.status(422).json({
        success: false,
        message: "data incomplete",
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
    const room = await Room.findOne({ roomNum: roomNum });
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "room doesnt exist",
      });
    }
    const room_id = room._id;
    const booking = await Booking.findOne({ room_id: room_id });
    if (!booking) {
      const newBooking = await Booking.create({
        room_id: room_id,
        guestName: guestName,
        phone: phone,
        check_in: validated_check_in,
        check_out: validated_check_out,
      });
      return res.status(200).json({
        success: true,
        message: "booking created succesfully",
        data: newBooking,
      });
    } else {
      const exisitngBookings = await Booking.find({ room_id: room_id });
      const overlap = exisitngBookings.some((booking) => {
        return (
          booking.check_in < validated_check_out &&
          booking.check_out > validated_check_in
        );
      });
      if (overlap) {
        return res.status(409).json({
          success: false,
          message: "room booked for the given set of dates",
        });
      } else {
        const newBooking = await Booking.create({
          room_id: room_id,
          guestName: guestName,
          phone: phone,
          check_in: validated_check_in,
          check_out: validated_check_out,
        });
        return res.status(200).json({
          success: true,
          message: "booking created succesfully",
          data: newBooking,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

export const findBooking = async (req, res, next) => {
  try {
    const { roomNum, guestName } = req.query;
    const searchParams = {};
    if (roomNum) {
      const room = await Room.findOne({ roomNum: roomNum });
      if (room) {
        const roomId = room._id;
        searchParams.room_id = roomId;
      } else {
        const error = new Error("room doesn't exist");
        error.statusCode = 404;
        return next(error);
      }
    }
    if (guestName) {
      searchParams.guestName = guestName;
    }

    const bookings = await Booking.find(searchParams);
    return res.status(200).json({
      success: true,
      message: "bookings found succesfully",
      data: bookings,
      searchParams: searchParams,
    });
  } catch (error) {
    next(error);
  }
};
