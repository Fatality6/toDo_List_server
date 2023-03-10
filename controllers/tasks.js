import Task from "../models/Task.js";

//Create task
export const createTask = async (req, res) => {
  try {
    const task = req.body.data;
    const newTask = new Task({
      username: task.username,
      email: task.email,
      text: task.text,
    });
    await newTask.save();
    res.json({ newTask, message: "Задача создана" });
  } catch (error) {
    res.json({ message: "Что-то пошло не так" });
  }
};

//get all tasks
export const getAllTasks = async (req, res) => {
  try {
    const select = req.body.data;
    let sort;
    const tasks = await Task.find();
    //сортировка
    switch (select) {
      case "0":
        sort = tasks;
        break;
      case "username_asc":
        sort = tasks.sort((a, b) => {
          if (a.username > b.username) return 1;
          if (a.username < b.username) return -1;
          return 0;
        });
        break;
      case "username_desc":
        sort = tasks.sort((a, b) => {
          if (a.username < b.username) return 1;
          if (a.username > b.username) return -1;
          return 0;
        });
        break;
      case "email_asc":
        sort = tasks.sort((a, b) => {
          if (a.email < b.email) return 1;
          if (a.email > b.email) return -1;
          return 0;
        });
        break;
      case "email_desc":
        sort = tasks.sort((a, b) => {
          if (a.email > b.email) return 1;
          if (a.email < b.email) return -1;
          return 0;
        });
        break;
      case "completed_first":
        sort = tasks.sort((a, b) => {
          if (a.completed < b.completed) return 1;
          if (a.completed > b.completed) return -1;
          return 0;
        });
        break;
      case "in_progress_first":
        sort = tasks.sort((a, b) => {
          if (a.completed > b.completed) return 1;
          if (a.completed < b.completed) return -1;
          return 0;
        });
        break;
      default:
        throw new Error("Invalid sort type");
    }
    res.send(sort);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
};

//update task
export const updateTask = async (req, res) => {
  try {
    const { id, newText } = req.body;
    const task = await Task.findById(id);
    task.text = newText;
    task.editedByAdmin = true;
    await task.save();
    res.json({ task, message: "Задача отредактирована" });
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
};

//success task
export const successTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    task.completed = true;
    await task.save();
    res.json(task);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
};
