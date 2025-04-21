import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, User, Phone, Briefcase, Send } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/createStore';
import { closeModal } from '../store/features/modalSlice';
import { useCreateEmployeeMutation, useUpdateEmployeeMutation } from '../store/api/employeeApi';
import { toast } from 'react-toastify';
import { handleApiError } from '../utils/handleApiError';

// Схема валидации формы
const formSchema = z.object({
    fullName: z.string().min(2, { message: 'ФИО должно содержать минимум 2 символа' }),
    specialization: z.string().min(2, { message: 'Должность должна содержать минимум 2 символа' }),
    phone: z.string().min(11, { message: 'Телефон должен содержать минимум 11 цифр' }),
    telegramId: z.string().min(8, { message: 'Telegram ID должен содержать минимум 8 символа' }),
});

type FormValues = z.infer<typeof formSchema>;

const EmployeeModal: FC = () => {
    const dispatch = useDispatch();
    const { isOpen, type, employeeData } = useSelector((state: RootState) => state.modal);
    const [createEmployee] = useCreateEmployeeMutation();
    const [updateEmployee] = useUpdateEmployeeMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: employeeData?.fullName || '',
            specialization: employeeData?.specialization || '',
            phone: employeeData?.phone || '',
            telegramId: employeeData?.telegramId || '',
        },
    });

    const onSubmit = async (values: FormValues) => {
        
        try {
            switch (type) {
                case 'createEmployee':
                    await createEmployee(values).unwrap();
                    toast.success('Сотрудник успешно добавлен');
                    dispatch(closeModal());
                    break;
                case 'editEmployee':
                    console.log(employeeData?.id)
                    await updateEmployee({ id: employeeData?.id, ...values }).unwrap();
                    toast.success('Сотрудник успешно обновлен');
                    dispatch(closeModal());
                    break;
            }
        } catch (error) {
            handleApiError(error);
        }
    };

    const handleClose = () => {
        reset();
        dispatch(closeModal());
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-md">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold">
                        {type === 'createEmployee' ? 'Добавить сотрудника' : 'Редактировать сотрудника'}
                    </h2>
                    <button className="text-gray-500 hover:text-gray-700" onClick={handleClose}>
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-4">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 border rounded-lg p-3">
                            <User className="text-gray-400" size={20} />
                            <input
                                type="text"
                                {...register('fullName')}
                                placeholder="ФИО"
                                className="w-full outline-none"
                            />
                        </div>
                        {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>}

                        <div className="flex items-center gap-3 border rounded-lg p-3">
                            <Briefcase className="text-gray-400" size={20} />
                            <input
                                type="text"
                                {...register('specialization')}
                                placeholder="Должность"
                                className="w-full outline-none"
                            />
                        </div>
                        {errors.specialization && (
                            <p className="text-sm text-red-500 mt-1">{errors.specialization.message}</p>
                        )}

                        <div className="flex items-center gap-3 border rounded-lg p-3">
                            <Phone className="text-gray-400" size={20} />
                            <input
                                type="tel"
                                {...register('phone')}
                                placeholder="Телефон"
                                className="w-full outline-none"
                            />
                        </div>
                        {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>}

                        <div className="flex items-center gap-3 border rounded-lg p-3">
                            <Send className="text-gray-400" size={20} />
                            <input
                                type="text"
                                {...register('telegramId')}
                                placeholder="Telegram ID"
                                className="w-full outline-none"
                            />
                        </div>
                        {errors.telegramId && (
                            <p className="text-sm text-red-500 mt-1">{errors.telegramId.message}</p>
                        )}
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
                            Сохранить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeModal;
