const AppError = require("../utilities/appError");
const Notes = require("./../models/Notes");
const catchAsync = require("./../utilities/cathasync");

exports.getllAllNotes = catchAsync(async (req, res, next) => {
  const notes = await Notes.find({ user: req.user._id }); //find the allthe notes of user id
  res.status(200).json({
    status: "success",
    data: {
      notes,
    },
  });
});

exports.createNote = catchAsync(async (req, res, next) => {
  let obj = req.body;
  obj.user = req.user._id;
  const note = await Notes.create(obj);
  res.status(200).json({
    status: "success",
    note,
  });
});

exports.updateNote = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  let obj = {};
  const { title, description, tag } = req.body;
  if (title) obj.title = title;
  if (description) obj.description = description;
  if (tag) obj.tag = tag;
  let note = await Notes.findById(id);

  if (!note) {
    return next(new AppError("Not found a note", 400));
  }
  if (note.user.toString() !== req.user.id) {
    return next(new AppError("not allowed", 401));
  }
  note = await Notes.findByIdAndUpdate(id, { $set: obj }, { new: true });
  res.status(200).json({
    status: "success",
    note,
  });
});

exports.deleteNote = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  let note = await Notes.findById(id);

  if (!note) {
    return next(new AppError("Not found a note", 400));
  }
  if (note.user.toString() !== req.user.id) {
    return next(new AppError("not allowed", 401));
  }
  note = await Notes.findByIdAndDelete(id);
  res.status(200).json({
    status: "success",
    note,
  });
});
