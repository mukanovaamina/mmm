const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Подключение к MongoDB
mongoose
  .connect(
    "mongodb+srv://guzalmazitova:rayana2015@cluster0.ynanytb.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Успешное подключение к MongoDB");
  })
  .catch((err) => {
    console.error("Ошибка подключения к MongoDB:", err);
  });

// Определение схемы пользователя
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// Создание модели пользователя
const User = mongoose.model("User", userSchema);

// Регистрационная форма
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // Проверка наличия данных
  if (!username || !password) {
    return res.status(400).send("Пожалуйста, заполните все поля.");
  }

  try {
    // Создание нового пользователя
    const newUser = new User({ username, password });

    // Сохранение пользователя в базе данных
    await newUser.save();
    console.log("Пользователь успешно зарегистрирован:", newUser);
    return res.status(200).send("Пользователь успешно зарегистрирован.");
  } catch (err) {
    console.error("Ошибка при сохранении пользователя:", err);
    return res.status(500).send("Ошибка при сохранении пользователя.");
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
