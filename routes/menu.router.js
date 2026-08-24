import express from "express";
import {
  addMenu,
  deleteItem,
  getMenu,
  updateMenu,
} from "../controllers/menu.controller.js";

const menuRouter = express.Router();

menuRouter.get("/", getMenu);
menuRouter.post("/", addMenu);
menuRouter.put("/", updateMenu);
menuRouter.delete("/", deleteItem);

export default menuRouter;
