const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { body, validationResult } = require('express-validator');
const User = require("./user");

const app = express();

app.use(bodyParser.json());

mongoose.connect("mongodb+srv://guzalmazitova:rayana2015@cluster0.ynanytb.mongodb.net/mortex", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Middleware для обработки CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Middleware для валидации данных регистрации
const validateRegistration = [
    body('username').isString().trim().notEmpty().withMessage('Username is required and must be a string'),
    body('password').isString().trim().notEmpty().withMessage('Password is required and must be a string'),
];

// Регистрация пользователя с валидацией
app.post("/register", validateRegistration, async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username: username });

        if (existingUser) {
            return res.status(400).json({ success: false, message: "Username already exists" });
        }

        const newUser = new User({
            username: username,
            password: password,
        });

        await newUser.save();
        res.json({ success: true, message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Registration failed", error: err.message });
    }
});

// Добавление пользователя
app.post("/users", async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.json({ success: true, message: "User created successfully" });
    } catch (err) {
        res.json({ success: false, message: "Failed to create user" });
    }
});

// Получение всех пользователей
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json({ success: true, users: users });
    } catch (err) {
        res.json({ success: false, message: "Failed to fetch users" });
    }
});

// Получение пользователя по ID
app.get("/users/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId);
        res.json({ success: true, user: user });
    } catch (err) {
        res.json({ success: false, message: "Failed to fetch user" });
    }
});

// Обновление пользователя по ID
app.put("/users/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
        res.json({ success: true, user: updatedUser, message: "User updated successfully" });
    } catch (err) {
        res.json({ success: false, message: "Failed to update user" });
    }
});

// Удаление пользователя по ID
app.delete("/users/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
        await User.findByIdAndDelete(userId);
        res.json({ success: true, message: "User deleted successfully" });
    } catch (err) {
        res.json({ success: false, message: "Failed to delete user" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
