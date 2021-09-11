const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  type: {
    type: Number,
    required: [true, "type is required"],
  },
});

const Users = (module.exports = mongoose.model("Users", UsersSchema));
