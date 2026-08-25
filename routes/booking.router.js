import express from "express";
import {
  createBooking,
  findBooking,
} from "../controllers/booking.controller.js";
import {
  createOrder,
  getRoomOrder,
  updateOrder,
} from "../controllers/service.controller.js";

const bookingRouter = express.Router();

bookingRouter.get("/", findBooking);
bookingRouter.post("/", createBooking);
bookingRouter.post("/:id/room-service", createOrder);
bookingRouter.get("/:id/room-service", getRoomOrder);
bookingRouter.patch("/room-service/:id", updateOrder);

export default bookingRouter;
