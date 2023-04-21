const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const config = require("./config");
const Todo = require("./models/todo");
const Goal = require("./models/goal");
const Note = require("./models/note");
const cors = require("cors");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Test DB connection
config
  .authenticate()
  .then(() => {
    console.log("Databae is connected");
  })
  .catch((err) => {
    console.log(err);
  });
/// /// /// /// /// /// /// /// /// /// /// /// /// /// ///

/// /// /// /// /// /// /// /// /// /// /// /// /// /// ///
// Todo HTTP Methods

// Retrieve all todos from DB todo table
app.get("/api/todos", (req, res) => {
  Todo.findAll()
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Find a todo based on their id
app.get("/api/todos/:todo_id", (req, res) => {
  const todoId = req.params.task_id;
  // Find by primary key
  Task.findByPk(todoId)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Create a new todo
app.post("/api/todos", (req, res) => {
  const id = uuidv4();
  const { description, name, start_date, end_date, status } = req.body;

  Todo.create({
    id,
    description,
    name,
    start_date,
    end_date,
    status,
  })
    .then((result) => {
      res.status(200).send(result); // result is the Todo that was created
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Update todo status
app.patch("/api/todos/update-status/:todo_id", (req, res) => {
  const todoId = req.params.todo_id;

  // Find the task based on the id
  Task.findByPk(todoId)
    .then((result) => {
      // Check if task exists in the database table
      if (!result) {
        res.status(404).send("Todo was not found");
        return;
      }
      result.status = req.body.status; // updating the todo status
      // Save the update into the database
      result
        .save()
        .then(() => {
          res.status(200).send(result);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
/// /// /// /// /// /// /// /// /// /// /// /// /// /// ///

/// /// /// /// /// /// /// /// /// /// /// /// /// /// ///
// Goal HTTP Methods

// Retrieve all goals from DB goal table
app.get("/api/goals", (req, res) => {
  Goal.findAll()
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Find a goal based on their id
app.get("/api/goals/:goal_id", (req, res) => {
  const goalId = req.params.goal_id;
  // Find by primary key
  Goal.findByPk(goalId)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Create a new goal
app.post("/api/goals", (req, res) => {
  const id = uuidv4();
  const { description, name, start_date, end_date, status } = req.body;

  Goal.create({
    id,
    description,
    name,
    start_date,
    end_date,
    status,
  })
    .then((result) => {
      res.status(200).send(result); // result is the Goal that was created
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Update goal status
app.patch("/api/goals/update-status/:goal_id", (req, res) => {
  const goalId = req.params.goal_id;

  // Find the task based on the id
  Goal.findByPk(goalId)
    .then((result) => {
      // Check if task exists in the database table
      if (!result) {
        res.status(404).send("Goal was not found");
        return;
      }
      result.status = req.body.status; // updating the goal status
      // Save the update into the database
      result
        .save()
        .then(() => {
          res.status(200).send(result);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
/// /// /// /// /// /// /// /// /// /// /// /// /// /// ///

/// /// /// /// /// /// /// /// /// /// /// /// /// /// ///
// Note HTTP Methods

// Retrieve all notes from DB note table
app.get("/api/notes", (req, res) => {
  Note.findAll()
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Find a note based on their id
app.get("/api/notes/:note_id", (req, res) => {
  const noteId = req.params.note_id;
  // Find by primary key
  Note.findByPk(noteId)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Create a new note
app.post("/api/notes", (req, res) => {
  const id = uuidv4();
  const { name, details, importance } = req.body;

  Note.create({
    id,
    name,
    details,
    importance,
  })
    .then((result) => {
      res.status(200).send(result); // result is the Note that was created
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
/// /// /// /// /// /// /// /// /// /// /// /// /// /// ///
// Server
const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
/// /// /// /// /// /// /// /// /// /// /// /// /// /// ///
