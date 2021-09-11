const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  id: {
    type: Number,
    unique: true
  },
  items: [
    {
      id: Number,
      quantity: Number,
    },
  ],
  delivery_person_id: {
    type: String,
    default: "0",
  },
  status: {
    type: Number,
    default: 1,
  },
  addresses: [],
});

const Order = (module.exports = mongoose.model("Order", OrderSchema, 'orders'));
