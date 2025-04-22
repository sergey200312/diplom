const service = require('./service')

const create = async (req, res) => {
    try {
        console.log(req.body)
        const brigade = await service.create(req.body);
        res.status(200).json(brigade);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const brigades = await service.getAll(req.query);    
        res.status(200).json(brigades);
    } catch (error) {        
        res.status(400).json({ message: error.message });
    }
};

module.exports = { 
    getAll, 
    create 
}