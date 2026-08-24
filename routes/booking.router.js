import express from "express";
import {
  createBooking,
  findBooking,
} from "../controllers/booking.controller.js";

const bookingRouter = express.Router();

bookingRouter.get("/", findBooking);
bookingRouter.post("/", createBooking);

export default bookingRouter;
