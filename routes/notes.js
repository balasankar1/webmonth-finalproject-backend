const express = require("express");

const {
  addNote,
  getAllNotes,
  updateNote,
  deleteNote,
} = require("../controllers/note");

const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add", verifyToken, addNote);

router.get("/getallnotes", verifyToken, getAllNotes);

router.put("/update/;noteId", verifyToken, updateNote);

router.delete("/delete/;noteId", verifyToken, deleteNote);

module.exports = router;
