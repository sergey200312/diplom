import React, { FC } from 'react';
import { useGetAllEmployeeQuery } from '../store/api/employeeApi';
import EmployeeItem from './EmployeeItem';
import { IEmployee } from '../types/employee';

interface EmployeeListProps {
    employees: IEmployee[] , 
    isLoading: boolean
}
export const EmployeeList: FC<EmployeeListProps> = ({ employees, isLoading }) => {

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }


  return (
    <div className="overflow-x-auto bg-white rounded-md shadow">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100 text-left text-gray-700 text-sm uppercase">
          <tr>
            <th className="px-6 py-3">ФИО</th>
            <th className="px-6 py-3">Должность</th>
            <th className="px-6 py-3">Телефон</th>
            <th className="px-6 py-3">Действия</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-900">
          {employees.length > 0 ? (
            employees.map((employee: IEmployee) => (
              <EmployeeItem key={employee.id} employee={employee} />
            ))
          ) : (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                Нет данных о сотрудниках
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};