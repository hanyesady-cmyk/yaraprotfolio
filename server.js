const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

// ================= Middleware =================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// ================= MongoDB =================

mongoose
  .connect(  "mongodb://yaraproject:yarahany@ac-yvtsvct-shard-00-00.28jilub.mongodb.net:27017,ac-yvtsvct-shard-00-01.28jilub.mongodb.net:27017,ac-yvtsvct-shard-00-02.28jilub.mongodb.net:27017/PortfolioDB?ssl=true&replicaSet=atlas-imewaa-shard-0&authSource=admin&appName=Cluster0")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

// ================= Schema =================

const commentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    comment: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

// ================= API =================

// Get Comments
app.get("/test", (req, res) => {
  res.json({ message: "API Working" });
});

app.get("/api/comments", async (req, res) => {
  try {
    const comments = await Comment.find().sort({
      createdAt: -1,
    });

    res.status(200).json(comments);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

// Add Comment

app.post("/api/comments", async (req, res) => {
  try {
    const { name, comment } = req.body;

    if (!name || !comment) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    const newComment = await Comment.create({
      name,
      comment,
    });

    res.status(201).json(newComment);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
});
// ================= Delete Comment =================

app.delete("/api/comments/:id", async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);

    if (!deletedComment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    res.json({
      message: "Comment deleted successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

// ================= Update Comment =================

app.put("/api/comments/:id", async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        comment: req.body.comment,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedComment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    res.json(updatedComment);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

// ================= Frontend =================

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ================= Start Server =================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});