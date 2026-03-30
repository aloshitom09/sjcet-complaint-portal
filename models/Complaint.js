const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved", "Rejected"],
    default: "Pending"
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  image_url: String,
  admin_response: String
}, { timestamps: true });

module.exports = mongoose.model("Complaint", complaintSchema);