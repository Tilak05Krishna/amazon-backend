const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const productRouter = require("./Routes/products");
const userRouter = require("./Routes/users");

//App config
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(logger("dev"));

app.use("/products", productRouter);
app.use("/users", userRouter);

//Listen Command
const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`Listening on port ${port}`));
