const express = require("express");
const router = express.Router();
const authContoller = require("./../controllers/authContoller");
const notesController = require("./../controllers/notesController");
router.get("/", authContoller.protect, notesController.getllAllNotes);
router.post("/createNote", authContoller.protect, notesController.createNote);
router.patch(
  "/updateNote/:id",
  authContoller.protect,
  notesController.updateNote
);
router.delete(
  "/deleteNote/:id",
  authContoller.protect,
  notesController.deleteNote
);
module.exports = router;
