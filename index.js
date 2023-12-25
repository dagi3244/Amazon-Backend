// import { initializeApp } from "firebase-admin/app";
// const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(process.env.SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (request, response) => response.status(200).send("hello world"));
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("Payment Request Recieved for this amount >>>", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  //ok create

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
//listens command
app.listen(3000, () => console.log("Listening on port 3000"));
// exports.api = functions.https.onRequest(app);

// http://127.0.0.1:5001/clone-49d14/us-central1/api
