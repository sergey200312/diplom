import { useState } from 'react';
import { MainLayout } from '../layout/MainLayout';
import { useGetAllEmployeePlainQuery } from '../store/api/employeeApi';
import useDropdown from '../hooks/useDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { openCreateBrigadeModal } from '../store/features/modalSlice';
import { RootState } from '../store/createStore';
import CreateBrigadeModal from '../components/CreateBrigadeModal';
import { useGetAllBrigadesQuery } from '../store/api/brigadeApi';
import {  ChevronDown } from 'lucide-react';

// Определяем типы для наших данных
type Employee = {
    id: number;
    name: string;
    position: string;
    phone: string;
    brigadeId: string
};

type Team = {
    id: number;
    name: string;
    leader: string;
    specialization: string;
    members: number;
};

const BrigadeManagementPage = () => {
    // Состояния для формы создания бригады
    const [teamName, setTeamName] = useState('');
    const [teamLeader, setTeamLeader] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [activeTab, setActiveTab] = useState<'teams' | 'members'>('teams');
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
    const { data: employees, isLoading } = useGetAllEmployeePlainQuery({});
    const { data: teamsData } = useGetAllBrigadesQuery({});
    const [isExpanded, setIsExpanded] = useState(false);
    console.log(teamsData)
    const dispatch = useDispatch()
    const modalIsOpen = useSelector((state: RootState) => state.modal.isOpen)
    console.log(employees)

    // Моковые данные
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





    return (
        <MainLayout>
            <div className="bg-gray-50 min-h-screen p-6">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">ГазСервис</h1>
                    
                    {/* Навигация по разделам */}
                    <div className="flex mb-6 border-b border-gray-200">
                        <button
                            className={`px-4 py-2 font-medium ${activeTab === 'teams' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                            onClick={() => setActiveTab('teams')}
                        >
                            Управление бригадами
                        </button>
                        <button
                            className={`px-4 py-2 font-medium ${activeTab === 'members' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                            onClick={() => setActiveTab('members')}
                            disabled={!selectedTeam}
                        >
                            {selectedTeam ? `Состав: ${selectedTeam.name}` : 'Состав бригады'}
                        </button>
                    </div>



                    {/* Список бригад */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
                        <button
                            type="submit"
                            className="max-w-1/2 mb-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            onClick={() => dispatch(openCreateBrigadeModal())}
                        >
                            СОЗДАТЬ БРИГАДУ
                        </button>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-700">Список бригад</h2>
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Поиск бригад..."
                                />
                                <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Все специализации</option>
                                    <option value="Аварийное обслуживание">Аварийное обслуживание</option>
                                    <option value="Техническое обслуживание">Техническое обслуживание</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {!isLoading && teamsData.map((team:any) => (
                                <div key={team.id} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium text-lg">Название: {team.name}</h3>
                                            <p className="text-gray-600">Количество сотрудников: {team.Employees.length}</p>
                                        </div>
                                        <div className="flex space-x-2">
                                          <ChevronDown onClick={() => setIsExpanded(prev => !prev)}/>
                                        </div>
                                    </div>
                                    {isExpanded && <div className='mt-2 p-1 border-solid border border-gray-200 rounded-md'>
                                        <h5 className='mb-1 font-semibold'>Состав бригады</h5>
                                        { team.Employees.map((employee:any) => (
                                            <div key={employee.id} className="flex items-center space-x-2">
                                                <p>ФИО: <span className='text-gray-500'>{employee.fullName} |</span></p>
                                                <p>Должность:<span className='text-gray-500'> {employee.specialization} |</span></p>
                                                <p>Телефон:<span className='text-gray-500'> {employee.phone}</span> </p>
                                            </div>
                                        ))}
                                    </div>}
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between items-center mt-6">
                            <span className="text-gray-600">Найдено бригад: {teams.length}</span>
                            <div className="flex space-x-2">
                                <button className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50">
                                    Предыдущая
                                </button>
                                <button className="px-3 py-1 border border-gray-300 rounded-md bg-blue-100">1</button>
                                <button className="px-3 py-1 border border-gray-300 rounded-md">2</button>
                                <button className="px-3 py-1 border border-gray-300 rounded-md">
                                    Следующая
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {modalIsOpen && <CreateBrigadeModal />}
        </MainLayout>
    );
};

export default BrigadeManagementPage;