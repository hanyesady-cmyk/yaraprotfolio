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

// ================= Frontend =================



// ================= Start Server =================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});