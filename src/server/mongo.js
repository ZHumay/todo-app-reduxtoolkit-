const { default: mongoose } = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const { Schema } = mongoose;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
mongoose.connect(
  "mongodb+srv://humay:yCRCu7Xdto8ueEgU@cluster0.xpk0pdu.mongodb.net/tododb"
);
let todosSchema = new Schema({
  todo: String,
  completed: Boolean,
  date: { type: Date, default: Date.now },
});
let Todos = mongoose.model("Todos", todosSchema);
app.get("/todos/api", (req, res) => {
  Todos.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
app.get("/todos/api/:id", (req, res) => {
  Todos.findById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
app.post("/todos/api", (req, res) => {
  let todo = new Todos({
    todo: req.body.todo,
    completed: req.body.completed,
  });
  todo.save();
  res.json(todo);
});
app.put("/todos/api/:id", function (req, res) {
  let id = req.params.id;
  let newTodo = {
    todo: req.body.todo,
    completed: req.body.completed,
    date: new Date(),
  };
  Todos.findByIdAndUpdate(id, newTodo, { new: true })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json(err));
});
app.delete("/todos/api/:id", (req, res) => {
  Todos.findByIdAndRemove(req.params.id)
    .then((data) => {
      res.json({
        msg: "Deleted Succesfully",
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
app.put("/todos/api/delete/completed", async (req, res) => {
  try {
    const idsToDelete = req.body.map((item) => item._id);
    await Todos.deleteMany({ _id: { $in: idsToDelete } });
    res.json({ msg: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.listen(3002, () => {
});