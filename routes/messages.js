const express = require("express");
const router = express.Router();
const Message = require("../models/message");
const User = require("../models/user");
const { isAdmin, isAuthenticated } = require("../middleware/auth.js");

router.get("/", async (req, res) => {
  try {
    const messages = await Message.findAll({
      include: User,
      order: [["timestamp", "DESC"]],
    });
    const user = req.user;
    console.log("messagesssss", messages.User)
    res.render("messages", { messages, user });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
  const { title, text } = req.body;
  try {
    const newMessage = await Message.create({
      title,
      text,
      user_id: req.user.id,
    });
    res.redirect("/messages");
  } catch (error) {
    console.error("Error saving new message:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const result = await Message.destroy({ where: { id: req.params.id } });
    if (result) {
      res.redirect("/messages");
    } else {
      res.status(404).send("Message not found");
    }
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).send("Internal Server Error");
  }
  await Message.findByIdAndDelete(req.params.id);
  res.redirect("/messages");
});

module.exports = router;
