import Task from "../models/Task.js";
import Activity from "../models/Activity.js";

const logActivity = async (action, task, user) => {
  await Activity.create({ action, task, user });
};

export const getTasks = async (req, res) => {
  const { page = 1, limit = 10, search, status, priority, sort } = req.query;
  const query = {};

  if (search) query.title = { $regex: search, $options: "i" };
  if (status) query.status = status;
  if (priority) query.priority = priority;
  if (req.user.role !== "Admin") query.createdBy = req.user._id;

  const tasks = await Task.find(query)
    .populate("assignee", "email role")
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort(sort || "-createdAt");

  const total = await Task.countDocuments(query);
  res.json({ tasks, total, page: Number(page) });
};

export const createTask = async (req, res) => {
  const task = await Task.create({ ...req.body, createdBy: req.user._id });
  await logActivity("create", task._id, req.user._id);
  res.status(201).json(task);
};

export const getTask = async (req, res) => {
  const task = await Task.findById(req.params.id).populate("assignee", "email");
  if (!task) return res.status(404).json({ message: "Task not found" });
  if (req.user.role !== "Admin" && task.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Forbidden" });
  }
  res.json(task);
};

export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  if (req.user.role !== "Admin" && task.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Forbidden" });
  }

  Object.assign(task, req.body);
  await task.save();
  await logActivity("update", task._id, req.user._id);
  res.json(task);
};

export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  if (req.user.role !== "Admin" && task.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Forbidden" });
  }

  await task.deleteOne();
  await logActivity("delete", task._id, req.user._id);
  res.json({ message: "Task deleted" });
};
