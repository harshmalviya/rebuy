const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");

const db = process.env.db
  .replace("<password>", process.env.password)
  .replace("<user>", process.env.user);

mongoose.connect(db).then(() => {
  console.log("Connected to database 🚀");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled rejection! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
