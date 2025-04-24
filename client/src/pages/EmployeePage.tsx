import { FC, useState, useEffect } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { MainLayout } from '../layout/MainLayout'
import { EmployeeList } from '../components/EmployeeList'
import useInput from '../hooks/useInput'
import { useGetAllEmployeeQuery } from '../store/api/employeeApi'
import useDebounce from '../hooks/useDebounce'
import EmployeeModal from '../components/EmployeeModal'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/createStore'
import { openModal } from '../store/features/modalSlice'
import ReactPaginate from 'react-paginate'
import { Paginate } from '../components/Paginate'

export const EmployeePage: FC = () => {
  const searchTerm = useInput('')
  const debounce = useDebounce(searchTerm.value, 500)
  const dispatch = useDispatch()
  const { isOpen: isModal } = useSelector((state: RootState) => state.modal)
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(1)
  const [selectedSpecialization, setSelectedSpecialization] = useState('')

  const { data: response = { employees: [], totalCount: 0 }, isLoading } =
    useGetAllEmployeeQuery({
      searchTerm: debounce,
      page: page + 1,
      pageSize,
      specialization: selectedSpecialization
    })

  useEffect(() => {
    setPage(0)
  }, [selectedSpecialization])

  

  const handleChangeSpecialization = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpecialization(e.target.value)
  }

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
          <button
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            onClick={() => dispatch(openModal({ type: 'createEmployee'}))}
          >
            <span className="text-xl">＋</span> Добавить сотрудника
          </button>
        </div>

        <div className='mb-5'>
          <select
            className="w-1/3  px-4 py-2 border rounded-md"
            value={selectedSpecialization}
            onChange={handleChangeSpecialization}>
              <option value='' disabled hidden>Специализация</option>
              <option value='Газосварщик'>Газосварщик</option>
              <option value='Слесарь'>Слесарь</option>
            </select>
        </div>

        <EmployeeList
          employees={response.employees}
          isLoading={isLoading}
        />

        <div className="flex items-center gap-3 mt-6">
          <div><p>Найдено сотрудников: {response.totalCount}</p></div>
          <Paginate page={page} pageSize={pageSize} response={response}  setPage={setPage} />
          
        </div>
      </div>

      {isModal && <EmployeeModal />}
    </MainLayout>
  )
}