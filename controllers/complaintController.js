const Complaint = require("../models/Complaint");

// Create complaint
exports.createComplaint = async (req, res) => {
  try {
    const { title, description, category, priority } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ message: "Please provide essential fields." });
    }

    const complaint = await Complaint.create({
      title,
      description,
      category,
      priority: priority || "Medium",
      student_id: req.user.id,
      image_url: req.file ? req.file.path : ""
    });

    res.status(201).json(complaint);
  } catch (err) {
    console.error("Create Complaint Error:", err);
    res.status(500).json({ message: "Server error while creating complaint." });
  }
};

// User complaints
exports.getUserComplaints = async (req, res) => {
  try {
    const data = await Complaint.find({ student_id: req.user.id }).sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    console.error("Get User Complaints Error:", err);
    res.status(500).json({ message: "Server error fetching user complaints." });
  }
};

// Admin: all complaints
exports.getAllComplaints = async (req, res) => {
  try {
    const data = await Complaint.find().populate("student_id", "name email").sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    console.error("Get All Complaints Error:", err);
    res.status(500).json({ message: "Server error fetching all complaints." });
  }
};

// Admin: Respond to complaint (or update status generally)
exports.respondToComplaint = async (req, res) => {
  try {
    const { status, admin_response } = req.body;
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    if (status) complaint.status = status;
    if (admin_response !== undefined) complaint.admin_response = admin_response;

    await complaint.save();
    res.json(complaint);
  } catch (err) {
    console.error("Respond Error:", err);
    res.status(500).json({ message: "Server error responding to complaint." });
  }
};

// Delete
exports.deleteComplaint = async (req, res) => {
  try {
    await Complaint.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ message: "Server error deleting complaint." });
  }
};

// Stats
exports.getStats = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === "student") {
      query.student_id = req.user.id;
    }

    const total = await Complaint.countDocuments(query);
    const pending = await Complaint.countDocuments({ ...query, status: { $in: ["Pending", "In Progress"] } });
    const resolved = await Complaint.countDocuments({ ...query, status: "Resolved" });

    res.json({ total, pending, resolved });
  } catch (err) {
    console.error("Stats Error:", err);
    res.status(500).json({ message: "Server error fetching stats." });
  }
};