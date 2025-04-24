import { FC, useState } from 'react'
import { IEmployee } from '../types/employee'
import { ChevronDown, MoreVertical } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal, openModal } from '../store/features/modalSlice'
import { RootState } from '../store/createStore'
import { ConfirmModal } from './ConfirmModal'
import { useDeleteBrigadeMutation } from '../store/api/brigadeApi'
import { toast } from 'react-toastify'
import { handleApiError } from '../utils/handleApiError'



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
    const dispatch = useDispatch();
    const { isOpen } = useSelector((state: RootState) => state.modal);
    const [ deleteBrigade, { isLoading } ] = useDeleteBrigadeMutation();

    const handleDeleteBrigade = async (id: string) => {
        try {
            await deleteBrigade(id).unwrap();
            toast.success('Бригада успешно удалена');
            dispatch(closeModal());
        } catch(error) {
            handleApiError(error)
        }
    }


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
                            onMouseLeave={() => setIsMenuOpen(false)}
                            className='flex justify-center w-full'>
                            <MoreVertical className='h-5 w-5' />
                            {isMenuOpen && (
                                <>
                                    <div className="absolute z-10 mt-2 transform -translate-1/2 rounded-md shadow-lg bg-white">
                                        <ul className="py-2">
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => dispatch(openModal({ type: 'editBrigade', brigadeData: team }))}>Редактировать</li>
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => dispatch(openModal({ type: 'confirm' }))}>Удалить</li>
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
            { isOpen && <ConfirmModal 
            isOpen={isOpen} 
            title='Вы действительно хотите удалить бригаду?' 
            onClose={() => dispatch(closeModal())}
            onConfirm={() => handleDeleteBrigade(team.id)}
            /> }
        </div>
    )
}
