const express = require("express");
const bookingApi = (bookingCollection) => {
  const bookingRouter = express.Router();

  //   add booking slot
  bookingRouter.post("/", async (req, res) => {
    const bookingInfo = req.body;
    bookingInfo.createdAt = new Date();
    bookingInfo.status = "pending";
    const result = await bookingCollection.insertOne(bookingInfo);
    res.send(result);
  });

  //   get all bookings
  bookingRouter.get("/", async (req, res) => {
    const result = await bookingCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.send(result);
  });

  return bookingRouter;
};

module.exports = bookingApi;
