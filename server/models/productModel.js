const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
    },

    quantity: {
      type: Number,
      required: [true, "Please enter product quantity"],
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"],
      default: 0,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true, //track data when it was created or updated in database
  }
);

const productModel = mongoose.model("ProductModel", productSchema);

module.exports = productModel;
