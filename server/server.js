//USING TRADITIONAL METHODS HERE

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const productModel = require("./models/productModel");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Youre are currently on homepage.");
});

app.get("/products", async (req, res) => {
  try {
    const product = await productModel.find({});
    res.status(201).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    res.status(201).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
});

app.post("/products", async (req, res) => {
  try {
    const product = await productModel.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
});

//update a product
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findByIdAndUpdate(id, req.body);
    //We can not find the product in database
    if (!product) {
      return res
        .status(404)
        .json({ message: `Product not found with the id of ${id} ` });
    }
    const updatedProduct = await productModel.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
});

//delete a product

app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: `Product not found with the id of ${id}` });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
});

//TRADITIONAL CONNECTION

mongoose
  .connect(
    "mongodb+srv://user123:Your own password@api-crud.tumyvzf.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Sucessfully connected to MongoDB Atlas!");

    app.listen(5000, () => {
      console.log("Server is running on port 5000.........");
    });
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
  });

//MODERN CONNECTION

// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri =
//   "mongodb+srv://user123:your own password@api-crud.tumyvzf.mongodb.net/?retryWrites=true&w=majority";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
