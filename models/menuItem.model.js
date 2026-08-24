import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "item name is needed"],
  },
  price: {
    type: Number,
    required: [true, "item price is needed"],
  },
  category: {
    type: String,
    enum: ["breakfast", "lunch", "snacks", "dinner", "drinks", "misc"],
    default: "misc",
  },
});

const Menu = mongoose.model("Menu", MenuSchema);

export default Menu;
