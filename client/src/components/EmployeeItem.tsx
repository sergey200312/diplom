import { FC } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import UserAvatar from '../assets/user_12533276.png'
import { IEmployee } from '../types/employee';
import { useDeleteEmployeeMutation } from '../store/api/employeeApi';
import { useDispatch } from 'react-redux';
import { openModal } from '../store/features/modalSlice';


interface EmployeeItemProps {
  employee: IEmployee
}
const EmployeeItem: FC<EmployeeItemProps> = ({ employee }) => {
  const { id, fullName, phone, specialization } = employee
  const [employeeDelete, { isLoading }] = useDeleteEmployeeMutation()
  const dispatch = useDispatch()
  console.log(id)

  const handleDeleteEmployee = async (id: number) => {
    try {
      await employeeDelete(id).unwrap()
      console.log('Успешно удален')
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="px-6 py-4 flex items-center gap-3">
        <img src={UserAvatar} alt="Аватар" className="w-5 h-5" />
        <div>
          <div className="font-semibold">{fullName}</div>
        </div>
      </td>
      <td className='px-6 py-4'>{specialization}</td>
      <td className="px-6 py-4">+{phone}</td>
      <td className="px-6 py-4 flex gap-3 text-blue-600">
        <button>
          <Pencil className="w-4 h-4" onClick={() => dispatch(openModal({ type: 'editEmployee', employeeData: employee }))}  />
        </button>
        <button className="text-red-600">
          <Trash2 className="w-4 h-4" onClick={() => handleDeleteEmployee(Number(id))} />
        </button>
      </td>
    </tr>
  );
};

export default EmployeeItem;