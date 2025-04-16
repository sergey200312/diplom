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
import { openCreateEmployeeModal } from '../store/features/modalSlice'
import ReactPaginate from 'react-paginate'

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

  const handlePageClick = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected)
  }

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
            onClick={() => dispatch(openCreateEmployeeModal())}
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
              <option value='Газовик'>Газовик</option>
            </select>
        </div>

        <EmployeeList
          employees={response.employees}
          isLoading={isLoading}
        />

        <div className="flex items-center gap-3 mt-6">
          <div><p>Найдено сотрудников: {response.totalCount}</p></div>
          <ReactPaginate
            breakLabel="..."
            nextLabel="Следующая >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={Math.ceil(response.totalCount / pageSize)}
            previousLabel="< Предыдущая"
            renderOnZeroPageCount={null}
            forcePage={page}
            containerClassName="flex justify-center gap-2"
            pageClassName="px-3 py-1 border rounded hover:bg-gray-100"
            activeClassName="bg-blue-500 text-white"
            previousClassName="px-3 py-1 border rounded hover:bg-gray-100"
            nextClassName="px-3 py-1 border rounded hover:bg-gray-100"
            disabledClassName="opacity-50 cursor-not-allowed"
            breakClassName="px-3 py-1"
          />
        </div>
      </div>

      {isModal && <EmployeeModal />}
    </MainLayout>
  )
}