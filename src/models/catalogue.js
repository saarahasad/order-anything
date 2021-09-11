const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CatalogueSchema = new Schema({
  category_name: String,
  category_id: Number,
  addresses: [
    {
      address: String,
      lat: Number,
      long: Number,
    },
  ],
});

const Catalogue = (module.exports = mongoose.model(
  "Catalogue",
  CatalogueSchema,
  "catalogue"
));
