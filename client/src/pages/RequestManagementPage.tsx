import { useState } from 'react';
import { MainLayout } from '../layout/MainLayout';

// Типы данных
type Employee = {
  id: number;
  name: string;
  position: string;
  phone: string;
};

type Team = {
  id: number;
  name: string;
  leader: string;
  specialization: string;
  members: number;
};

type Request = {
  id: number;
  address: string;
  problem: string;
  createdAt: string;
  status: 'Новая' | 'В работе' | 'Выполнена' | 'Отменена';
  assignedTeam?: number | null;
  assignedEmployee?: number | null;
};

const RequestManagementPage = () => {
  // Состояния
  const [activeTab, setActiveTab] = useState<'requests' | 'assignment'>('requests');
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('Все');
  const [searchQuery, setSearchQuery] = useState('');

  // Моковые данные
  const requests: Request[] = [
    {
      id: 1,
      address: 'ул. Ленина, 10, кв. 5',
      problem: 'Протечка газа',
      createdAt: '2023-05-15 10:30',
      status: 'В работе',
      assignedTeam: 1
    },
    {
      id: 2,
      address: 'ул. Гагарина, 25, кв. 12',
      problem: 'Замена счетчика',
      createdAt: '2023-05-16 14:15',
      status: 'Новая'
    },
    {
      id: 3,
      address: 'ул. Советская, 5, кв. 3',
      problem: 'Ремонт газовой плиты',
      createdAt: '2023-05-17 09:00',
      status: 'Выполнена',
      assignedEmployee: 1
    }
  ];

  const teams: Team[] = [
    {
      id: 1,
      name: 'Аварийная бригада',
      leader: 'Сидоров П.П.',
      specialization: 'Аварийное обслуживание',
      members: 4
    },
    {
      id: 2,
      name: 'Плановый ремонт',
      leader: 'Иванов И.И.',
      specialization: 'Техническое обслуживание',
      members: 3
    }
  ];

  const employees: Employee[] = [
    { id: 1, name: 'Сидоров Петр Петрович', position: 'Слесарь', phone: '+79185543363' },
    { id: 2, name: 'Иванов Иван Иванович', position: 'Мастер', phone: '+79185543364' },
    { id: 3, name: 'Петров Алексей Алексеевич', position: 'Электрик', phone: '+79185543365' }
  ];

  // Обработчики
  const handleAssign = (request: Request) => {
    setSelectedRequest(request);
    setActiveTab('assignment');
  };

  const handleStatusChange = (requestId: number, newStatus: Request['status']) => {
    // В реальном приложении здесь будет запрос к API
    console.log(`Изменен статус заявки ${requestId} на ${newStatus}`);
  };

  const handleAssignmentSubmit = (type: 'team' | 'employee', id: number) => {
    // В реальном приложении здесь будет запрос к API
    console.log(`Назначено ${type === 'team' ? 'бригада' : 'сотрудник'} ${id} на заявку ${selectedRequest?.id}`);
    setActiveTab('requests');
  };

  // Фильтрация заявок
  const filteredRequests = requests.filter(request => {
    const matchesStatus = statusFilter === 'Все' || request.status === statusFilter;
    const matchesSearch = request.address.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         request.problem.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Получение названия назначенной бригады/сотрудника
  const getAssignedName = (request: Request) => {
    if (request.assignedTeam) {
      const team = teams.find(t => t.id === request.assignedTeam);
      return `Бригада: ${team?.name || 'Не найдена'}`;
    }
    if (request.assignedEmployee) {
      const employee = employees.find(e => e.id === request.assignedEmployee);
      return `Сотрудник: ${employee?.name || 'Не найден'}`;
    }
    return 'Не назначено';
  };

  return (
    <MainLayout>
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">ГазСервис - Управление заявками</h1>
        
        {/* Навигация */}
        <div className="flex mb-6 border-b border-gray-200">
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'requests' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('requests')}
          >
            Список заявок
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'assignment' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('assignment')}
            disabled={!selectedRequest}
          >
            Назначение
          </button>
        </div>

        {activeTab === 'requests' ? (
          <div className="bg-white p-6 rounded-lg shadow">
            {/* Фильтры и поиск */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Статус:</span>
                <select 
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="Все">Все</option>
                  <option value="Новая">Новая</option>
                  <option value="В работе">В работе</option>
                  <option value="Выполнена">Выполнена</option>
                  <option value="Отменена">Отменена</option>
                </select>
              </div>
              
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                  placeholder="Поиск по адресу/проблеме..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <i className="fas fa-search"></i>
                </div>
              </div>
            </div>

            {/* Список заявок */}
            <div className="space-y-4">
              {filteredRequests.length > 0 ? (
                filteredRequests.map(request => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h3 className="font-medium text-lg">{request.address}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            request.status === 'Новая' ? 'bg-blue-100 text-blue-800' :
                            request.status === 'В работе' ? 'bg-yellow-100 text-yellow-800' :
                            request.status === 'Выполнена' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {request.status}
                          </span>
                        </div>
                        <p className="text-gray-600 mt-1">{request.problem}</p>
                        <p className="text-sm text-gray-500 mt-2">Создано: {request.createdAt}</p>
                        <p className="text-sm mt-1">
                          <span className="font-medium">Назначено:</span> {getAssignedName(request)}
                        </p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row md:flex-col gap-2">
                        <button
                          onClick={() => handleAssign(request)}
                          className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                        >
                          Назначить
                        </button>
                        <select
                          value={request.status}
                          onChange={(e) => handleStatusChange(request.id, e.target.value as Request['status'])}
                          className="px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        >
                          <option value="Новая">Новая</option>
                          <option value="В работе">В работе</option>
                          <option value="Выполнена">Выполнена</option>
                          <option value="Отменена">Отменена</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Нет заявок, соответствующих критериям поиска
                </div>
              )}
            </div>

            {/* Пагинация */}
            <div className="flex justify-between items-center mt-6">
              <span className="text-gray-600">Найдено заявок: {filteredRequests.length}</span>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50">
                   Предыдущая
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md bg-blue-100">1</button>
                <button className="px-3 py-1 border border-gray-300 rounded-md">
                  Следующая 
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-700">
                Назначение на заявку: {selectedRequest?.address}
              </h2>
              <button
                className="text-blue-600 hover:text-blue-800"
                onClick={() => setActiveTab('requests')}
              >
                <i className="fas fa-arrow-left mr-2"></i> Назад к списку
              </button>
            </div>

            <div className="mb-4">
              <p className="font-medium">Проблема: {selectedRequest?.problem}</p>
              <p className="text-gray-600">Текущий статус: {selectedRequest?.status}</p>
            </div>

            {/* Выбор типа назначения */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Назначение бригады */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-lg mb-3">Назначить бригаду</h3>
                <div className="space-y-3">
                  {teams.map(team => (
                    <div key={team.id} className="border border-gray-200 rounded-lg p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{team.name}</p>
                        <p className="text-sm text-gray-600">Руководитель: {team.leader}</p>
                        <p className="text-sm text-gray-600">Специализация: {team.specialization}</p>
                      </div>
                      <button
                        onClick={() => handleAssignmentSubmit('team', team.id)}
                        className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                      >
                        Назначить
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Назначение сотрудника */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-lg mb-3">Назначить сотрудника</h3>
                <div className="space-y-3">
                  {employees.map(employee => (
                    <div key={employee.id} className="border border-gray-200 rounded-lg p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-sm text-gray-600">{employee.position}</p>
                        <p className="text-sm text-gray-600">{employee.phone}</p>
                      </div>
                      <button
                        onClick={() => handleAssignmentSubmit('employee', employee.id)}
                        className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                      >
                        Назначить
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </MainLayout>
  );
};

export default RequestManagementPage;