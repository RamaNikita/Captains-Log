require("dotenv").config();
const express = require("express");
const db = require("./config/database");
const app = express();
const PORT = process.env.PORT || 3000;
const methodOverride = require("method-override");
const { connect, connection } = require("mongoose");
const Logs = require("./models/logs");

// Database connection
connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
connection.once("open", () => {
  console.log("connected to mongo");
});

// View Engine Middleware Configure
const reactViewsEngine = require("jsx-view-engine").createEngine();
app.engine("jsx", reactViewsEngine);
// This line tells the render method the default file extension to look for.
app.set("view engine", "jsx");
// This line sets the render method's default location to look for a jsx file to render. Without this line of code we would have to specific the views directory everytime we use the render method
app.set("views", "./views");

// Custom Middleware
app.use(express.urlencoded({ extended: false }));
//after app has been defined
//use methodOverride.  We'll be adding a query parameter to our delete form named _method
app.use(methodOverride("_method"));
// this tells the server to go look for static assets in the public folder like css,imgs, or fonts
app.use(express.static("public"));
app.use((req, res, next) => {
  console.log("Middleware running...");
  next();
});

// Index
app.get("/logs", async (req, res) => {
  try {
    const foundLogs = await Logs.find({});
    res.render("Index", { logs: foundLogs });
  } catch (err) {
    res.status(400).send(err);
  }
});
// New
app.get("/logs/new", (req, res) => {
  res.render("New");
});
// Delete
app.delete("/logs/:id", async (req, res) => {
  try {
    await Logs.findByIdAndDelete(req.params.id);
    res.redirect("/logs");
  } catch (err) {
    res.status(400).send(err);
  }
});
// Update
app.put("/logs/:id", async (req, res) => {
  try {
    req.body.shipIsBroken = req.body.shipIsBroken === "on";
    await Logs.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect("/logs");
  } catch (err) {
    res.status(400).send(err);
  }
});
// Create
app.post("/logs", async (req, res) => {
  try {
    req.body.shipIsBroken = req.body.shipIsBroken === "on";
    const newLog = await Logs.create(req.body);
    res.redirect("/logs");
  } catch (err) {
    res.status(400).send(err);
  }
});
// Edit
app.get("/logs/:id/edit", async (req, res) => {
  try {
    const foundLog = await Logs.findById(req.params.id);
    res.render("Edit", { log: foundLog });
  } catch (err) {
    res.status(400).send(err);
  }
});
// Show
app.get("/logs/:id", async (req, res) => {
  try {
    const foundLog = await Logs.findById(req.params.id);
    res.render("Show", { log: foundLog });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Default
app.get("/*", (req, res) => {
  res.redirect("/logs");
});

// Listen
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
