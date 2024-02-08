const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const UserModel = require("./user.model");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://guzalmazitova:rayana2015@cluster0.ynanytb.mongodb.net/mortex?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true, // Новый параметр
});

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = await UserModel.create({ username, password });
    res.json({ status: "ok", user: { username: newUser.username } });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: err.message });
  }
});

const PORT = process.env.PORT || 1337;

// Используйте app.listen, чтобы предотвратить ошибку EADDRINUSE
const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Обработка закрытия сервера для избежания ошибки EADDRINUSE
process.on('SIGINT', function() {
  console.log('Server shutting down');
  server.close(function() {
    console.log('Server closed');
    process.exit(0);
  });
});
