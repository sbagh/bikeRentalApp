const express = require("express");
const bodyParser = require("body-parser"); //convert json file
const cors = require("cors"); //fix http headers issues
const app = express();
const apiPort = 8080;

// APIs url
const bikeRouter = require("./routes/bike-router");
// database
const db = require("./database/index");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

// connect database and send error message if error exist
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
   res.send("Hello World!");
});

app.use("/api", bikeRouter);

app.listen(apiPort, () => console.log(`Server is running on port ${apiPort}`));
