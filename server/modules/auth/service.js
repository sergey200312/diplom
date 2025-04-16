const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (user) => {
    const { email, password } = user
    console.log(user)
    const IsExistUser = await User.findOne({ where: { email } })
    console.log('авпыппвввва')

    if (!IsExistUser) {
        throw new Error("Пользователь не найден")
    }

    const isValidPassword = await bcrypt.compare(password, IsExistUser.password)

    if (!isValidPassword) {
        throw new Error("Неверный пароль или email")
    }

    const token = jwt.sign({ id: IsExistUser.id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });

    return token
}

const register = async (user) => {
    const { email, password, username } = user
    const IsExistUser = await User.findOne({ where: { email } })

    if (IsExistUser) {
        throw new Error("Пользователь уже существует")
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const newUser = await User.create({ email, password: hashPassword, username })

    return newUser
}

module.exports = {
    login,
    register
}