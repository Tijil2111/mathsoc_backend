import Menu from "../models/menuItem.model.js";

export const getMenu = async (req, res, next) => {
  try {
    const menu = await Menu.find({});
    return res.status(200).json({
      success: true,
      message: "menu is fetched succesfully",
      data: menu,
    });
  } catch (error) {
    next(error);
  }
};
export const addMenu = async (req, res, next) => {
  try {
    const { name, price, category } = req.body;
    const newItem = await Menu.create({
      name: name,
      price: price,
      category: category,
    });
    return res.status(200).json({
      success: true,
      message: "Menu Item created succesfully",
      data: newItem,
    });
  } catch (error) {
    next(error);
  }
};
export const updateMenu = async (req, res, next) => {
  try {
    const { name } = req.params;
    const { price, category } = req.body;
    const updatedItem = await Menu.findOneAndUpdate(
      { name },
      { price, category },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );
    if (!updatedItem) {
      const error = new Error("item not found");
      error.statusCode = 404;
      throw error;
    }

    return res.status(200).json({
      success: true,
      message: "item updated successfully",
      data: updatedItem,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteItem = async (req, res, next) => {
  try {
    const { name } = req.params;
    const deletedItem = await Menu.findOneAndDelete({ name });
    if (!deletedItem) {
      const error = new Error("item not found");
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json({
      success: true,
      message: "item deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
