import { FC, useState } from 'react'
import { IEmployee } from '../types/employee'
import { ChevronDown, MoreVertical } from 'lucide-react'



interface IBrigade {
    id: string
    name: string
    Employees: IEmployee[]
}
interface IBrigadeProps {
    team: IBrigade
    expandedTeams: Record<number, boolean>
    toggleTeamExpansion: (teamId: number) => void
}
export const BrigadeItem: FC<IBrigadeProps> = ({ team, expandedTeams, toggleTeamExpansion }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-medium text-lg">Название: {team.name}</h3>
                    <p className="text-gray-600">Количество сотрудников: {team.Employees.length}</p>
                </div>
                <div className='flex item-center gap-4 '>
                    <div className="flex space-x-2">
                        <button onClick={() => toggleTeamExpansion(Number(team.id))}>
                            <ChevronDown className={`transition-transform ${expandedTeams[Number(team.id)] ? 'rotate-180' : ''}`} />
                        </button>
                    </div>
                    <div className='relative'>
                        <button onMouseEnter={() => setIsMenuOpen(true)}
                            onMouseLeave={() => setIsMenuOpen(false)}>
                            <MoreVertical className='h-5 w-5' />
                            {isMenuOpen && (
                                <>
                                    {/* Затемнение фона */}

                                    {/* Меню */}
                                    <div className="absolute z-10 mt-2 top-full -right-1/2 rounded-md shadow-lg bg-white">
                                        <ul className="py-2">
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Редактировать</li>
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Удалить</li>
                                        </ul>
                                    </div>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            {expandedTeams[Number(team.id)] && (
                <div className='mt-2 p-1 border-solid border border-gray-200 rounded-md'>
                    <h5 className='mb-1 font-semibold'>Состав бригады</h5>
                    {team.Employees.map((employee) => (
                        <div key={employee.id} className="flex items-center space-x-2">
                            <p>ФИО: <span className='text-gray-500'>{employee.fullName} |</span></p>
                            <p>Должность: <span className='text-gray-500'> {employee.specialization} |</span></p>
                            <p>Телефон: <span className='text-gray-500'> {employee.phone}</span> </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
