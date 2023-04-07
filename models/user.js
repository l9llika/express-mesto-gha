const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Жан плов ВАНДАМ!',
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Чёткий парень',
  },
  avatar: {
    type: String,
    required: true,
    default: 'https://i.pinimg.com/564x/94/2b/0b/942b0b5510f73be4885d812cc4228de0--claude-van-damme-best-jeans.jpg',
    validate: {
      validator: (url) => /(:?(?:https?:\/\/)?(?:www\.)?)?[-a-z0-9]+\.\w+/ig.test(url),
      message: 'Некорретктный URL',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Неверный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
  versionKey: false,
});

module.exports = mongoose.model('user', userSchema);
