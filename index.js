const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const config = require("./config");
const Todo = require("./models/todo");
const Goal = require("./models/goal");
const Note = require("./models/note");
const Diary = require("./models/diary");
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
// Todo HTTP Methods
/// /// /// /// /// /// /// /// /// /// /// /// /// /// ///

// Retrieve all pending todos from DB todo table
app.get("/api/todos", (req, res) => {
  Todo.findAll({ where: { status: "pending", deleted: "false" } }) // you can filter multiple columns
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Retrieve all todos marked as deleted from DB todos table
app.get("/api/todos/deleted", (req, res) => {
  Todo.findAll({ where: { deleted: "true" } }) // you can filter multiple columns
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Find a todo based on their id
app.get("/api/todos/:todo_id", (req, res) => {
  const todoId = req.params.todo_id;
  // Find by primary key
  Todo.findByPk(todoId)
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
  const deleted = "false";
  const { description, name, start_date, end_date, status } = req.body;

  Todo.create({
    id,
    description,
    name,
    start_date,
    end_date,
    status,
    deleted,
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

  // Find the todo based on the id
  Todo.findByPk(todoId)
    .then((result) => {
      // Check if todo exists in the database table
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

// Update todo delete status
app.patch("/api/todos/deleted-status/:todo_id", (req, res) => {
  const todoId = req.params.todo_id;

  // Find the todo based on the id
  Todo.findByPk(todoId)
    .then((result) => {
      // Check if todo exists in the database table
      if (!result) {
        res.status(404).send("Todo was not found");
        return;
      }
      result.deleted = req.body.deleted; // updating the todo deleted status
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

// Complete update of a Todo record
app.put("/api/todos/update-todo/:todo_id", (req, res) => {
  const todoId = req.params.todo_id;
  const todoData = req.body;
  // Find the todo
  Todo.findByPk(todoId)
    .then((result) => {
      if (!result) {
        res.status(404).send("Todo not found");
      } else {
        // Here we are doing a full update but we can do a partial update using PUT
        result.name = todoData.name;
        result.description = todoData.description;
        result.start_date = todoData.start_date;
        result.end_date = todoData.end_date;
        result.status = todoData.status;

        // Save changes to database
        result
          .save()
          .then(() => {
            res.status(200).send(result);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Delete a todo from db
app.delete("/api/todos/:todo_id", (req, res) => {
  const todoId = req.params.todo_id;

  // Find the todo based on the id
  Todo.findByPk(todoId)
    .then((result) => {
      // Check if todo exists in the database table
      if (!result) {
        res.status(404).send("Todo was not found");
        return;
      }

      // Delete todo from database
      result
        .destroy()
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
// Goal HTTP Methods
/// /// /// /// /// /// /// /// /// /// /// /// /// /// ///

// Retrieve all pending goals from DB goal table
app.get("/api/goals", (req, res) => {
  Goal.findAll({ where: { status: "pending", deleted: "false" } }) // you can filter multiple columns
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Retrieve all goals marked as deleted from DB goals table
app.get("/api/goals/deleted", (req, res) => {
  Goal.findAll({ where: { deleted: "true" } }) // you can filter multiple columns
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
  const deleted = "false";
  const { description, name, start_date, end_date, status } = req.body;

  Goal.create({
    id,
    description,
    name,
    start_date,
    end_date,
    status,
    deleted,
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

  // Find the goal based on the id
  Goal.findByPk(goalId)
    .then((result) => {
      // Check if goal exists in the database table
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

// Update goal delete status
app.patch("/api/goals/deleted-status/:goal_id", (req, res) => {
  const goalId = req.params.goal_id;

  // Find the goal based on the id
  Goal.findByPk(goalId)
    .then((result) => {
      // Check if goal exists in the database table
      if (!result) {
        res.status(404).send("goal was not found");
        return;
      }
      result.deleted = req.body.deleted; // updating the goal deleted status
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

// Complete update of a Goal record
app.put("/api/goals/update-goal/:goal_id", (req, res) => {
  const goalId = req.params.goal_id;
  const goalData = req.body;
  // Find the goal
  Goal.findByPk(goalId)
    .then((result) => {
      if (!result) {
        res.status(404).send("Goal not found");
      } else {
        // Here we are doing a full update but we can do a partial update using PUT
        result.name = goalData.name;
        result.description = goalData.description;
        result.start_date = goalData.start_date;
        result.end_date = goalData.end_date;
        result.status = goalData.status;

        // Save changes to database
        result
          .save()
          .then(() => {
            res.status(200).send(result);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Delete a goal from db
app.delete("/api/goals/:goal_id", (req, res) => {
  const goalId = req.params.goal_id;

  // Find the goal based on the id
  Goal.findByPk(goalId)
    .then((result) => {
      // Check if goal exists in the database table
      if (!result) {
        res.status(404).send("Goal was not found");
        return;
      }

      // Delete goal from database
      result
        .destroy()
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
// Note HTTP Methods
/// /// /// /// /// /// /// /// /// /// /// /// /// /// ///

// Retrieve all notes from DB note table
app.get("/api/notes", (req, res) => {
  Note.findAll({ where: { deleted: "false" } })
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Retrieve all notes marked as deleted from DB notes table
app.get("/api/notes/deleted", (req, res) => {
  Note.findAll({ where: { deleted: "true" } }) // you can filter multiple columns
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

// Update note delete status
app.patch("/api/notes/deleted-status/:note_id", (req, res) => {
  const noteId = req.params.note_id;

  // Find the note based on the id
  Note.findByPk(noteId)
    .then((result) => {
      // Check if note exists in the database table
      if (!result) {
        res.status(404).send("note was not found");
        return;
      }
      result.deleted = req.body.deleted; // updating the note deleted status
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

// Create a new note
app.post("/api/notes", (req, res) => {
  const id = uuidv4();
  const deleted = "false";
  const { name, details, importance } = req.body;

  Note.create({
    id,
    name,
    details,
    importance,
    deleted,
  })
    .then((result) => {
      res.status(200).send(result); // result is the Note that was created
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Complete update of a Note record
app.put("/api/notes/update-note/:note_id", (req, res) => {
  const noteId = req.params.note_id;
  const noteData = req.body;
  // Find the note
  Note.findByPk(noteId)
    .then((result) => {
      if (!result) {
        res.status(404).send("Note not found");
      } else {
        // Here we are doing a full update but we can do a partial update using PUT
        result.name = noteData.name;
        result.details = noteData.details;
        result.importance = noteData.importance;

        // Save changes to database
        result
          .save()
          .then(() => {
            res.status(200).send(result);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Delete a note from db
app.delete("/api/notes/:note_id", (req, res) => {
  const noteId = req.params.note_id;

  // Find the note based on the id
  Note.findByPk(noteId)
    .then((result) => {
      // Check if note exists in the database table
      if (!result) {
        res.status(404).send("Note was not found");
        return;
      }

      // Delete note from database
      result
        .destroy()
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
// Achievements HTTP Methods
/// /// /// /// /// /// /// /// /// /// /// /// /// /// ///

// Retrieve all completed Todos from DB note table
app.get("/api/achievements/achieved-todos", (req, res) => {
  Todo.findAll({ where: { status: "completed", deleted: "false" } }) // you can filter multiple columns
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Retrieve all completed Goals from DB note table
app.get("/api/achievements/achieved-goals", (req, res) => {
  Goal.findAll({ where: { status: "completed", deleted: "false" } })
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

/// /// /// /// /// /// /// /// /// /// /// /// /// /// ///
// Diary HTTP Methods
/// /// /// /// /// /// /// /// /// /// /// /// /// /// ///

// Retrieve all image diaries from DB dairies table
app.get("/api/diaries/images", (req, res) => {
  Diary.findAll({ where: { type: "image" } })
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Retrieve all video diaries from DB dairies table
app.get("/api/diaries/videos", (req, res) => {
  Diary.findAll({ where: { type: "video" } })
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Find a diary based on their id
app.get("/api/diaries/:diary_id", (req, res) => {
  const diaryId = req.params.diary_id;
  // Find by primary key
  Diary.findByPk(diaryId)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Create a new image
app.post("/api/diaries/new-image", (req, res) => {
  const id = uuidv4();
  const type = "image";
  const { link } = req.body;

  Diary.create({
    id,
    link,
    type,
  })
    .then((result) => {
      res.status(200).send(result); // result is the image Diary that was created
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
// Create a new video
app.post("/api/diaries/new-video", (req, res) => {
  const id = uuidv4();
  const type = "video";
  const data = req.body;
  const link_id = data.link.split("v=")[1]; // getting the youtube video id out of the link
  const ytEmbed = "https://www.youtube.com/embed/";
  const link = ytEmbed.concat(link_id);

  Diary.create({
    id,
    link,
    type,
  })
    .then((result) => {
      res.status(200).send(result); // result is the video Diary that was created
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Delete a diary from db
app.delete("/api/diaries/:diary_id", (req, res) => {
  const diaryId = req.params.diary_id;

  // Find the diary based on the id
  Diary.findByPk(diaryId)
    .then((result) => {
      // Check if diary exists in the database table
      if (!result) {
        res.status(404).send("Diary was not found");
        return;
      }

      // Delete note from database
      result
        .destroy()
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
// Server
/// /// /// /// /// /// /// /// /// /// /// /// /// /// ///
const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
/// /// /// /// /// /// /// /// /// /// /// /// /// /// ///
