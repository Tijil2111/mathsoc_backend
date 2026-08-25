import Booking from "../models/booking.model.js";
import Service from "../models/service.model.js";
import Menu from "../models/menuItem.model.js";
export const createOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { menuItems } = req.body;
    const today = new Date();

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "booking doesnt exist",
      });
    }
    const checkIn = booking.check_in;
    const checkOut = booking.check_out;
    if (checkIn <= today && checkOut >= today) {
      const newOrder = await Service.create({
        bookingId: id,
        menuItems: menuItems,
      });
      return res.status(200).json({
        success: true,
        message: "order created succesfully",
        data: newOrder,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "you dont have a booking today",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getRoomOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const services = await Service.find({ bookingId: id });
    if (!services) {
      return res.status(400).json({
        success: false,
        message: "no services found for this booking id/id is invalid",
      });
    }
    let totalBill = 0;
    for (const service of services) {
      for (const item of service.menuItems) {
        const menuItem = await Menu.findOne({ name: itemName });
        const itemTotal = menuItem.price * item.qty;
        totalBill += itemTotal;
      }
    }
    return res.status(200).json({
      success: true,
      message: "service data gotten",
      data: services,
      totalBill: totalBill,
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    const service = await Service.findById(id);
    if (!service) {
      return res.status(400).json({
        success: false,
        message: "no services found for this booking id/id is invalid",
      });
    }
    const updatedService = await Service.findByIdAndUpdate(
      { id },
      { status: status },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );
    return res.status(200).json({
      success: true,
      message: "status of service updated succesfully",
      data: updatedService,
    });
  } catch (error) {
    next(error);
  }
};
