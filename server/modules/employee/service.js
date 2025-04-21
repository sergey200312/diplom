
const { Employee } = require("../../models")
const { Op } = require('sequelize');

const create = async (employee) => {
    const { phone, telegramId } = employee
    const isExist = await Employee.findOne({ where: { phone, telegramId } })

    if (isExist) {
        throw new Error('Сотрудник с таким номеров телефона или телеграм аккаунтом уже существует')
    }

    const newEmployee = await Employee.create(employee)
    return newEmployee
}


const getAll = async (params) => {
    const { page = 1, pageSize = 2, searchTerm, specialization } = params;
    const where = {};

    if (searchTerm?.trim()) {
        const clean = searchTerm.trim();

        where.fullName = {
            [Op.iLike]: `%${clean}%`,
        };

    }


    if (specialization && specialization.length) {
        console.log(specialization)
        where.specialization = {
            [Op.in]: [specialization],
        }
    }


    const employees = await Employee.findAll({ 
        where,
        limit: pageSize,
        offset: (page - 1) * pageSize
    });

    console.log(employees)

    const totalCount = await Employee.count({ where });

    return { totalCount, employees }
};

const getAllPlain = async () => {
    const employees = await Employee.findAll()

    if (!employees.length) {
        throw new Error('Сотрудники не найдены')
    }

    const availableEmployees = employees.filter(e => e.brigadeId === null)

    if (!availableEmployees.length) {
        throw new Error('Все сотрудники заняты')
    }

    return availableEmployees
}

const deleteId = async (id) => {
    const employee = await Employee.findByPk(id)

    if (!employee) {
        throw new Error('Employee not found')
    }

    await employee.destroy()
    return employee
}

const getById = async (id) => {
    const employee = await Employee.findByPk(id)

    if (!employee) {
        throw new Error('Сотрудник не найден')
    }

    return employee
}

const update = async (id, employee) => {
    const employeeToUpdate = await Employee.findByPk(id)

    if (!employeeToUpdate) {
        throw new Error('Сотрудник не найден')
    }

    await employeeToUpdate.update(employee)
    return employeeToUpdate
}

module.exports = {
    create,
    getAll,
    deleteId,
    getById,
    update,
    getAllPlain
}