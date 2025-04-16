const { get } = require("http");
const specialization = require("../../enums/specialization");
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


const getAll = async (filter) => {
    const { searchTerm } = filter;
    const where = {};

    if (searchTerm?.trim()) {
        const clean = searchTerm.trim();

        where.fullName = {
            [Op.iLike]: `%${clean}%`,
        };

    }


    const employees = await Employee.findAll({ where });
    return employees;
};



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
    update
}