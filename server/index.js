const express = require("express");
const bodyParser = require("body-parser"); //convert json file
const cors = require("cors"); //fix http headers issues
const app = express();
const apiPort = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
   res.send("Hello World!");
});

app.listen(apiPort, () => console.log(`Server is running on port ${apiPort}`));
