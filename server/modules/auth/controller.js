const service = require('./service');

const login = async (req, res) => {
    try {
        const token = await service.login(req.body);
        res.status(200).json({ token });
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }
};

const register = async (req, res) => {
    try {
        const user = await service.register(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    login,
    register,
};
