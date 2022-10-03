const express = require("express");
const db = require("../firebaseAdmin");

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  const products = [];
  try {
    const productsRef = db.collection("products");
    const snapshot = await productsRef.get();
    snapshot.forEach((doc) => {
      products.push(doc.data());
    });
    res.send(products);
  } catch (error) {
    console.log(`Firestore error while fetching products is: \n ${error}`);
    res.status(500).send("Internal server error");
  }
});

module.exports = productRouter;
