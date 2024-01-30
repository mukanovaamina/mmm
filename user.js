const mongoose = require('mongoose');

// Определение схемы пользователя
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

// Создание модели пользователя на основе схемы
const User = mongoose.model('User', userSchema);

// Экспорт модели пользователя
module.exports = User;
