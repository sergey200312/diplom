const { Op } = require('sequelize')
const { Brigade, Employee } = require('../../models')



const create = async (team) => {
  try {
    console.log(team)
    const employeeIds = team.memberIds.map(member => member.id);
    
    if (employeeIds.length < 2 || employeeIds.length > 4) {
      throw new Error('Бригада должна содержать от 2 до 4 сотрудников');
    }

    const existingEmployees = await Employee.findAll({
      where: { id: { [Op.in]: employeeIds } }
    });

    if (existingEmployees.length !== employeeIds.length) {
      const missingIds = employeeIds.filter(id => 
        !existingEmployees.some(e => e.id === id)
      ).join(', ');
      throw new Error(`Сотрудники с ID ${missingIds} не найдены`);
    }

    const busyEmployees = existingEmployees.filter(e => e.brigadeId !== null);
    if (busyEmployees.length > 0) {
      const busyIds = busyEmployees.map(e => e.id).join(', ');
      throw new Error(`Сотрудники ${busyIds} уже в других бригадах`);
    }

    const newBrigade = await Brigade.create({
      name: team.name || `Бригада ${await Brigade.count() + 1}`,
      description: team.description || null
    });

    await Employee.update(
      { brigadeId: newBrigade.id },
      { where: { id: { [Op.in]: employeeIds } } }
    );

    return await Brigade.findByPk(newBrigade.id, {
      include: [{
        model: Employee,
        as: 'Employees',
        attributes: ['id', 'fullName', 'phone', 'specialization']
      }]
    });

  } catch (error) {
    console.error('Ошибка создания бригады:', error);
    throw error;
  }
};

const getAll = async (params) => {
  const { page = 1, pageSize = 1 } = params
  try {
    const brigades = await Brigade.findAll({
      include: [{
        model: Employee,
        as: 'Employees',
        attributes: ['id', 'fullName', 'phone', 'specialization'] 
      }],
      limit: pageSize,
      offset: (page - 1) * pageSize
    })

    if (!brigades.length) {
      throw new Error('Бригады не найдены')
    }

    const totalCount = await Brigade.count()

    return { brigades, totalCount }
  } catch (error) {
    console.error('Ошибка получения бригад:', error);
    throw error
  }
}

const deleteBrigade = async (id) => {
  try {
    const brigade = await Brigade.findByPk(id);

    if (!brigade) {
      throw new Error('Бригада не найдена');
    }

    await Employee.update({ brigadeId: null }, { where: { brigadeId: id } });

    await brigade.destroy();
    return brigade;

  } catch (error) {
    console.error('Ошибка удаления бригады:', error);
    throw error;
  }
};



module.exports = { 
  create, 
  getAll,
  deleteBrigade
};