const express = require("express");
const router = express.Router();

const {
  createComplaint,
  getUserComplaints,
  getAllComplaints,
  respondToComplaint,
  deleteComplaint,
  getStats
} = require("../controllers/complaintController");

const { protect, adminOnly } = require("../middleware/authMiddleware");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

router.post("/", protect, upload.single("image"), createComplaint);
router.get("/user", protect, getUserComplaints);
router.get("/stats", protect, getStats); // Dynamic stats depending on role

// Admin / Respond
router.get("/", protect, adminOnly, getAllComplaints);
router.put("/:id/status", protect, adminOnly, respondToComplaint);
router.put("/:id/respond", protect, adminOnly, respondToComplaint);
router.post("/:id/respond", protect, adminOnly, respondToComplaint);
router.put("/:id", protect, adminOnly, respondToComplaint);
router.delete("/:id", protect, adminOnly, deleteComplaint);

module.exports = router;