const catchAsync = require("../utils/catchAsync");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const appError = require("../utils/appError");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user: {
        name: user.name,
        email: user.email
      }
    }
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  let user;
  try {
    const { email, name, password } = req.body;
    user = await User.create({
      name,
      email,
      password
    });
  } catch (error) {
    return next(new appError(error.message, 500));
  }

  createSendToken(user, 200, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new appError("Email or password is required for login...", 400)
    );
  }

  let user;

  try {
    user = await User.findOne({ email }).select("+password");
  } catch (error) {
    return next(new appError("Failed to login", 500));
  }

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new appError("Incorrect email or password", 401));
  }

  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new appError("You are not logged in! Please log in to get access.", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new appError("The user belong to this token does no longer exists.", 401)
    );
  }

  req.user = currentUser;
  next();
});

exports.validateToken = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      message: "Valid User",
      user: { name: req.user.name, email: req.user.email }
    }
  });
};

exports.getMe = catchAsync(async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "itemsToSell",
      match: { sold: false }
    });

    res.status(200).json({
      status: "success",
      data: { user }
    });
  } catch (error) {
    return next(new appError(error.message, 500));
  }
});
