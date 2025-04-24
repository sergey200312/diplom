import { FC, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Users, UserPlus, UserMinus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/createStore';
import { closeModal } from '../store/features/modalSlice';
import { useCreateBrigadeMutation } from '../store/api/brigadeApi'
import { useGetAllEmployeePlainQuery } from '../store/api/employeeApi';
import { toast } from 'react-toastify';
import { handleApiError } from '../utils/handleApiError'
import useDropdown from '../hooks/useDropdown';
import { DropdownMenu } from './DropdownMenu';
import { IEmployee } from '../types/employee';
// Схема валидации формы
const formSchema = z.object({
    specialization: z.string().min(1, { message: 'Выберите специализацию' }),
    members: z.array(
        z.object({
            id: z.string(),
            fullName: z.string(),
            specialization: z.string(),
        })
    ).min(1, { message: 'Добавьте хотя бы одного сотрудника' })
});

type FormValues = z.infer<typeof formSchema>;

const CreateBrigadeModal: FC = () => {
    const dispatch = useDispatch();
    const { isOpen: isOpenModal} = useSelector((state: RootState) => state.modal);
    const [createBrigade] = useCreateBrigadeMutation();
    const { data: employees = [] } = useGetAllEmployeePlainQuery({});
    const [teamSize, setTeamSize] = useState<number>(2);
    const [availableEmployees, setAvailableEmployees] = useState<typeof employees>([]);
    const {
        isOpen,
        searchTerm,
        filteredEmployees,
        handleBlur,
        handleFocus,
        handleSelect,
    } = useDropdown(availableEmployees || []);

    const {
        register,
        handleSubmit,
        trigger,
        setValue,
        watch,
        formState: { errors },
        reset,
        setError,
        clearErrors
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            specialization: '',
            members: []
        }
    });

    useEffect(() => {
        trigger('members');
    }, [teamSize, trigger]);

    // Фильтруем доступных сотрудников
    useEffect(() => {
        if (employees.length > 0) {
            setAvailableEmployees(employees.filter((emp: any) => !emp.brigadeId));
        }
    }, [employees]);

    const onSubmit = async (values: FormValues) => {
        console.log('форма')
        try {
            console.log('отправка формы')
            const currentMembers = watch('members');

            if (currentMembers.length > teamSize) {
                console.log('нельзя')
                setError('members', {
                    type: 'maxLength',
                    message: `Максимальное количество участников: ${teamSize}`
                });

                return
            }
            console.log(values.specialization)
            console.log(values.members)

            await createBrigade({
                specialization: values.specialization,
                memberIds: values.members
            }).unwrap();

            toast.success('Бригада успешно создана');
            handleClose();
        } catch (error) {
            handleApiError(error);
        }
    };

    const handleClose = () => {
        reset();
        setTeamSize(2);
        dispatch(closeModal());
    };

    const handleAddMember = (employee: typeof employees[0]) => {
        const currentMembers = watch('members');
        if (currentMembers.length > teamSize + 1) {
            setError('members', {
                type: 'maxLength',
                message: `Максимальное количество участников: ${teamSize}`
            });
            return
        }
        clearErrors('members');

        setValue('members', [...currentMembers, {
            id: String(employee.id),
            fullName: employee.fullName,
            specialization: employee.specialization
        }]);
        trigger('members')

        // Обновляем список доступных сотрудников
        setAvailableEmployees((prev: any) => prev.filter((emp: any) => emp.id !== employee.id));
    };

    useEffect(() => {
        console.log('Ошибки формы:', errors);
    }, [errors]);

    const handleRemoveMember = (employeeId: string) => {
        const currentMembers = watch('members')
        setValue('members', currentMembers.filter(m => m.id !== employeeId));

        // Возвращаем сотрудника в доступные
        const employee = employees.find((emp: any) => emp.id === employeeId);
        if (employee) {
            setAvailableEmployees((prev: any) => [...prev, employee]);
        }
    };



    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur">
            <div className="bg-white rounded-lg w-full max-w-2xl">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold">Создать новую бригаду</h2>
                    <button className="text-gray-500 hover:text-gray-700" onClick={handleClose}>
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-4">
                    <div className="space-y-4">

                        {/* Руководитель бригады */}
                        <div className="border rounded-lg p-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Руководитель бригады</label>
                            <div className="relative">
                                <DropdownMenu
                                    searchTerm={searchTerm}
                                    isOpen={isOpen}
                                    filteredEmployees={filteredEmployees}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    onSelect={handleAddMember}
                                />

                            </div>
                        </div>

                        {/* Специализация */}
                        <div className="border rounded-lg p-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Специализация</label>
                            <select
                                {...register('specialization')}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Выберите специализацию</option>
                                <option value="Аварийное обслуживание">Аварийное обслуживание</option>
                                <option value="Техническое обслуживание">Техническое обслуживание</option>
                                <option value="Плановый ремонт">Плановый ремонт</option>
                            </select>
                            {errors.specialization && <p className="text-sm text-red-500 mt-1">{errors.specialization.message}</p>}
                        </div>

                        {/* Размер бригады */}
                        <div className="border rounded-lg p-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Количество сотрудников (2-4)</label>
                            <div className="flex gap-2">
                                {[2, 3, 4].map(num => (
                                    <button
                                        key={num}
                                        type="button"
                                        onClick={() => setTeamSize(num)}
                                        className={`px-4 py-2 border rounded-lg ${teamSize === num ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-50'}`}
                                    >
                                        {num}
                                    </button>
                                ))}

                            </div>
                        </div>

                        {/* Выбранные сотрудники */}
                        <div className="border rounded-lg p-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Состав бригады</label>
                            {watch('members')?.length > 0 ? (
                                <div className="space-y-2">
                                    {watch('members').map(member => (
                                        <div key={member.id} className="flex justify-between items-center p-2 border rounded">
                                            <span>{member.fullName}</span>
                                            <span>{member.specialization}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveMember(member.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <UserMinus size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">Добавьте сотрудников</p>
                            )}
                            {errors.members && <p className="text-sm text-red-500 mt-1">{errors.members.message}</p>}
                        </div>

                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                        >
                            Отмена
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            СОЗДАТЬ БРИГАДУ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBrigadeModal;