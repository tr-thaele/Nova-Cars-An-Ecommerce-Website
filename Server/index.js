const mongoose = require("mongoose");
const express = require("express");
const PORT = process.env.PORT || 3001;
require("dotenv").config();

const app = express();
const mongodbConnectionString = process.env.MONGODB_URI;

// connecting to mongodb server
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongodbConnectionString);
}

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://localhost:3000"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

const formDataSchema = new mongoose.Schema({
  category: String,
  car: String,
  pickupLoc: String,
  dropoffLoc: String,
  dateOfPickup: String,
  dateOfDropoff: String,
});

const carsSchema = new mongoose.Schema({});

const FormDataModel = mongoose.model("vehicle", formDataSchema);
const carsModel = mongoose.model("car", carsSchema);

app.get("/server", async (req, res) => {
  try {
    const vehicles = await FormDataModel.find();
    const cars = await carsModel.find();
    const data = {
      vehicles,
      cars,
    };
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error getting form data!");
  }
});

app.post("/server", async (req, res) => {
  try {
    const formData = new FormDataModel(req.body);
    await formData.save();
    console.log("Form data saved successfully!", formData);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error saving form data!");
  }
});

app.listen(PORT, () => {
  console.log("Server started on port 3001");
});
