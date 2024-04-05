require("dotenv").config();
const Express = require("express");
const path = require("path");
const cors = require("cors");
const ejs = require("ejs");

const BodyParser = require("body-parser");
const { connectToMongoDB } = require("./src/Config/Database");

const configRoutes = require("./src/Config/Route");
// const { transporter, gmail } = require('./src/Config/Email');

const app = Express();
const PORT = process.env.APP_PORT || 3000;

// Set Engine
app.set("views", path.join(__dirname, "Views"));
app.set("view engine", "ejs");

app.use(Express.static("public"));
app.use(cors());

app.use('/uploads', Express.static(path.join(__dirname, 'public/assets/uploads')));
app.use('/uploads', Express.static(path.join(__dirname, 'uploads')));

configRoutes(app);
connectToMongoDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(PORT, () => {
  console.log(`Server running on port ${process.env.APP_BASE_URL}:${PORT}`);
});
