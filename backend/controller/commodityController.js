const Commodity = require("../model/commodityModel");
const User = require("../model/userModel");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createProduct = catchAsync(async (req, res, next) => {
  const { nameOfTheItem, category, priceListed, pictureOfItem } = req.body;
  let newCommodity;
  try {
    newCommodity = await Commodity.create({
      user: req.user.id,
      nameOfTheItem,
      category,
      priceListed,
      pictureOfItem
    });
  } catch (error) {
    return next(new appError(error.message, 500));
  }

  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { itemsToSell: newCommodity._id }
      },
      { new: true }
    );
    res
      .status(200)
      .json({ status: "success", data: { commodity: newCommodity } });
  } catch (error) {
    return next(new appError(error.message, 500));
  }
});

exports.getProductsToSell = catchAsync(async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate("itemsToSell");
    res
      .status(200)
      .json({ status: "success", data: { commodities: user.itemsToSell } });
  } catch (error) {
    return next(new appError(error.message, 500));
  }
});

exports.getProducts = catchAsync(async (req, res, next) => {
  try {
    const products = await Commodity.find({ sold: { $ne: true } });
    res.status(200).json({
      status: "success",
      length: products.length,
      data: { commodities: products }
    });
  } catch (error) {
    return next(new appError(error.message, 500));
  }
});

exports.getProduct = catchAsync(async (req, res, next) => {
  try {
    const product = await Commodity.findById(req.params.id).populate({
      path: "user",
      select: "name"
    });
    res.status(200).json({ status: "success", data: { commodity: product } });
  } catch (error) {
    return next(new appError(error.message, 500));
  }
});

exports.buyProduct = catchAsync(async (req, res, next) => {
  let product;

  try {
    product = await Commodity.findById(req.params.id);
  } catch (error) {
    return next(new appError(error.message, 500));
  }

  if (!product) {
    return next(new appError("No product found with that ID", 404));
  }

  if (product.user.toString() === req.user.id) {
    return next(new appError("You cannot buy your own product", 400));
  }

  try {
    product = await Commodity.findByIdAndUpdate(
      req.params.id,
      {
        sold: true
      },
      { new: true }
    );
  } catch (error) {
    return next(new appError(error.message, 500));
  }

  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { itemsPurchased: product._id }
      },
      { new: true }
    );
    res.status(200).json({ status: "success", data: { commodity: product } });
  } catch (error) {
    return next(new appError(error.message, 500));
  }
});

exports.getPurchasedProducts = catchAsync(async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate("itemsPurchased");
    res
      .status(200)
      .json({ status: "success", data: { commodities: user.itemsPurchased } });
  } catch (error) {
    return next(new appError(error.message, 500));
  }
});
