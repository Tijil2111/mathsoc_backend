import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";
import roomRouter from "./routes/room.router.js";
import bookingRouter from "./routes/booking.router.js";
import menuRouter from "./routes/menu.router.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/menu", menuRouter);

app.get("/", (req, res) => {
  res.send("mathsoc backend task ~ tijil ");
});
app.use(errorMiddleware);
app.listen(process.env.PORT, async () => {
  console.log(`running succesfully on ${process.env.PORT}`);
  try {
    await connectToDatabase();
  } catch (error) {
    console.log(`error conceded: ${error}`);
  }
});
