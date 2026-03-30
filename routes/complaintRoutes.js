const express = require("express");
const router = express.Router();

const {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateStatus,
  deleteComplaint
} = require("../controllers/complaintController");

const { protect, adminOnly } = require("../middleware/authMiddleware");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

router.post("/", protect, upload.single("image"), createComplaint);
router.get("/my", protect, getMyComplaints);

// Admin
router.get("/", protect, adminOnly, getAllComplaints);
router.put("/:id", protect, adminOnly, updateStatus);
router.delete("/:id", protect, adminOnly, deleteComplaint);

module.exports = router;