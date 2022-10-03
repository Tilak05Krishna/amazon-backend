const express = require("express");
const db = require("../firebaseAdmin");

const cartItemRouter = express.Router({ mergeParams: true });

cartItemRouter.get("/", async (req, res) => {
  const cartItems = [];
  try {
    const userCartItemsRef = db.collection(
      `users/${req.params.userId}/cartItems`
    );
    const snapshot = await userCartItemsRef.get();
    snapshot.forEach((doc) => {
      cartItems.push(doc.data());
    });
    res.status(200).send(cartItems);
  } catch (error) {
    console.log(`Firestore error while fetching cart items is:
      \n ${error}`);
    res.status(500).send("Internal server error");
  }
});

cartItemRouter.post("/", async (req, res) => {
  if (!req.body.title || !req.body.price || !req.body.imageUrl) {
    res.status(400);
    res.send("title, price and imageUrl required");
    return;
  }
  try {
    const userCartItemsRef = db
      .collection(`users/${req.params.userId}/cartItems`)
      .doc();
    const product = {
      ...req.body,
      id: userCartItemsRef.id,
    };
    await db
      .collection("users")
      .doc(req.params.userId)
      .collection("cartItems")
      .doc(userCartItemsRef.id)
      .set(product);
    res.status(200).send(product);
  } catch (error) {
    console.log(`Firestore error while adding cart Item is \n error: ${error}`);
    res.status(500).send("Internal server error");
  }
});

cartItemRouter.delete("/:cartItemId", async (req, res) => {
  try {
    const userCartItemRef = db.doc(
      `users/${req.params.userId}/cartItems/${req.params.cartItemId}`
    );
    await userCartItemRef.delete();
    res.sendStatus(200);
  } catch (error) {
    console.log(`Firestore error while deleting cart Item is: \n ${error}`);
    res.status(500).send("Internal server error");
  }
});

module.exports = cartItemRouter;
