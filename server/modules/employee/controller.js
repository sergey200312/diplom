const service = require('./service');

const create = async (req, res) => {
    try {
        const employee = await service.create(req.body, req.query);
        res.status(200).json(employee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const employees = await service.getAll(req.query);
        res.status(200).json(employees);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteId = async (req, res) => {
    try {
        const employee = await service.deleteId(req.params.id);
        res.status(200).json(employee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};  

const getById = async (req, res) => {
    try {
        const employee = await service.getById(req.body.id);
        res.status(200).json(employee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const update = async (req, res) => {
    console.log(req.params)
    try {
        const employee = await service.update(req.params.id, req.body);
        res.status(200).json(employee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }   
}
module.exports = {
    create,
    getAll,
    deleteId,
    getById,
    update
}   