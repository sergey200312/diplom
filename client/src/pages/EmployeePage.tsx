import { FC, useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { MainLayout } from '../layout/MainLayout'

import { EmployeeList } from '../components/EmployeeList'
import useInput from '../hooks/useInput'
import { useGetAllEmployeeQuery } from '../../store/api/employeeApi'
import useDebounce from '../hooks/useDebounce'
import EmployeeModal from '../components/EmployeeModal'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/createStore'
import { openCreateEmployeeModal } from '../../store/features/modalSlice'



export const EmployeePage: FC = () => {
  const searchTerm = useInput('')
  const debounce = useDebounce(searchTerm.value, 500)
  const dispatch = useDispatch()
  const { isOpen: isModal } = useSelector((state: RootState) => state.modal)

  const { data: employees = [], isLoading } = useGetAllEmployeeQuery({ searchTerm: debounce });

  return (
    <MainLayout>
      <div className="p-6 w-full">
        <h1 className="text-2xl font-bold mb-6">Сотрудники</h1>

        <div className='flex items-center justify-between mb-6'>
          <input
            type="text"
            placeholder="Поиск сотрудников..."
            className="w-full max-w-md px-4 py-2 border rounded-md"
            {...searchTerm}
          />
          <button className="bg-blue-600 text-white p-2 rounded  hover:bg-blue-700" onClick={() => dispatch(openCreateEmployeeModal())}>
            <span className="text-xl">＋</span> Добавить сотрудника
          </button>
        </div>
        <EmployeeList employees={employees} isLoading={isLoading} />

      </div>
      { isModal && <EmployeeModal/> }
    </MainLayout>
  )
}


