const { Schema, model } = require("mongoose");

const logSchema = new Schema(
  {
    title: String,
    entry: String,
    shipIsBroken: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Logs = model("Logs", logSchema);
module.exports = Logs;
