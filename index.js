const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./user"); // Подключаем схему пользователя
const app = express();

app.use(bodyParser.json());

mongoose.connect("mongodb+srv://guzalmazitova:rayana2015@cluster0.ynanytb.mongodb.net/mortex", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    try {
        const newUser = new User({
            username: username,
            password: password,
        });

        await newUser.save();
        res.json({ success: true, message: "User registered successfully" });
    } catch (err) {
        res.json({ success: false, message: "Registration failed" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
