import Booking from "../models/booking.model.js";
import Service from "../models/service.model.js";
export const createOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { menuItems, status } = req.body;
    const today = new Date();
    const isoToday = today.toISOString().split("T")[0];

    const booking = await Booking.findById({ id });
    if (!booking) {
      return res.status(400).json({
        success: false,
        message: "booking doesnt exist",
      });
    }
    const checkIn = booking.check_in;
    const checkOut = booking.check_out;
    if (checkIn <= isoToday && checkOut >= isoToday) {
      const newOrder = await Service.create({
        bookingId: id,
        menuItems: menuItems,
        status: status,
      });
      return res.status(200).json({
        success: true,
        message: "order created succesfully",
        data: newOrder,
      });
    } else {
    }
  } catch (error) {
    next(error);
  }
};
