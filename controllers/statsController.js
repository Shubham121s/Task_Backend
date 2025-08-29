import Task from "../models/Task.js";

export const getStats = async (req, res) => {
  const query = req.user.role === "Admin" ? {} : { createdBy: req.user._id };

  const statusCounts = await Task.aggregate([
    { $match: query },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  const priorityCounts = await Task.aggregate([
    { $match: query },
    { $group: { _id: "$priority", count: { $sum: 1 } } },
  ]);

  const overdue = await Task.countDocuments({
    ...query,
    dueDate: { $lt: new Date() },
    status: { $ne: "done" },
  });

  res.json({ statusCounts, priorityCounts, overdue });
};
