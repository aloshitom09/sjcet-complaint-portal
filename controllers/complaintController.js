const Complaint = require("../models/Complaint");

// Create complaint
exports.createComplaint = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const complaint = await Complaint.create({
      title,
      description,
      category,
      student_id: req.user.id,
      image_url: req.file ? req.file.path : ""
    });

    res.json(complaint);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Student complaints
exports.getMyComplaints = async (req, res) => {
  const data = await Complaint.find({ student_id: req.user.id });
  res.json(data);
};

// Admin: all complaints
exports.getAllComplaints = async (req, res) => {
  const data = await Complaint.find().populate("student_id", "name email");
  res.json(data);
};

// Update
exports.updateStatus = async (req, res) => {
  const { status, admin_response } = req.body;

  const complaint = await Complaint.findById(req.params.id);

  complaint.status = status;
  complaint.admin_response = admin_response;

  await complaint.save();

  res.json(complaint);
};

// Delete
exports.deleteComplaint = async (req, res) => {
  await Complaint.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};