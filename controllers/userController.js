exports.getUserProfile = async (req, res) => {
    try {
        // req.user is guaranteed to be populated by the protect middleware.
        // It already strips the password.
        res.json({
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role,
            createdAt: req.user.createdAt
        });
    } catch (err) {
        console.error("Get Profile Error:", err);
        res.status(500).json({ message: "Server error fetching user profile" });
    }
};
