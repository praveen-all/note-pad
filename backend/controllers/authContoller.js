const catchAsync = require("./../utilities/cathasync");
const User = require("./../models/User");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const AppError = require("./../utilities/appError");

const createJsonWebToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
// post request to create an user
exports.createUser = catchAsync(async (req, res, next) => {
  const doc = await User.create(req.body);
  const token = createJsonWebToken(doc._id);
  res.status(200).json({
    status: "success",
    token,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(
      new AppError("There is no User with this email ,please check again"),
      404
    );
  }

  const checkpassword = await user.comparePassword(password, user.password);
  if (!checkpassword) {
    return next(new AppError("incorrect password ", 404));
  }

  const token = createJsonWebToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
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
      new AppError("Your are not logged in ! please log in to get access ", 401)
    );
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError("The user belongs to this toke does not loget exist.", 401)
    );
  }
  req.user = freshUser;
  next();
});

exports.getuser = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    user: req.user,
  });
});
