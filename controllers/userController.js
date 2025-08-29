import User from "../models/User.js";

export const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};


// update role of a user (Admin only)
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const validRoles = ["Admin", "Member"];

    // Validate role
    if (!role || !validRoles.includes(role)) {
      return res.status(400).json({ message: `Invalid role. Allowed roles: ${validRoles.join(", ")}` });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role;
    await user.save();

    res.json({ message: "User role updated", user: { _id: user._id, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while updating user role" });
  }
};