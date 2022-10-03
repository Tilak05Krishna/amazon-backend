const express = require("express");
const cartItemRouter = require("./cartItems");

const userRouter = express.Router();

userRouter.use("/:userId/cartItems", cartItemRouter);

module.exports = userRouter;
