const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  id: Number,
  name: String,
  category: Number,
});

const Item = (module.exports = mongoose.model("Item", ItemSchema, "items"));
