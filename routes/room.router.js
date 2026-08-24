import express from "express";
import {
  createRoom,
  getRooms,
  getRoom,
  updateRoom,
  deleteRoom,
  availableRooms,
} from "../controllers/room.controller.js";
const roomRouter = express.Router();
roomRouter.get("/available", availableRooms);
roomRouter.post("/create-room", createRoom);
roomRouter.get("/", getRooms);
roomRouter.get("/:roomNum", getRoom);
roomRouter.patch("/:roomNum", updateRoom);
roomRouter.delete("/:roomNum", deleteRoom);

export default roomRouter;
