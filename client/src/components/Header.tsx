import React, { FC } from 'react'
import EmployeeIcon from '../assets/employee-id-svgrepo-com.svg';
import RequestIcon from '../assets/request-approval-svgrepo-com.svg'
import GasIcon from '../assets/gas-burner-svgrepo-com.svg'
import { EmployeeList } from './EmployeeList';
import { ROUTES } from '../router/constants';
import { Link } from 'react-router-dom';

export const Header: FC = () => {
    return (
        <section className='p-6 border-r border-solid bg-blue-700 border-gray-600 w-64 h-full'>
            <div className='flex gap-6 items-center mb-4'>
                <img src={GasIcon} alt='Логотип' className='w-6 h-6' />
                <span className='text-xl text-white'>ГазСервис</span>
            </div>
            <hr className="border-t border-white mb-4" />
            <nav>
                <ul className="flex flex-col gap-4">
                    <li className="hover:text-blue-500 transition-colors duration-200">
                        <Link to={ROUTES.EMPLOYEES} className="flex items-center gap-4">
                            <img src={EmployeeIcon} alt="Сотрудники" className="w-5 h-5" />
                            <span className='text-white'>Сотрудники</span>
                        </Link>
                    </li>
                    <li className="hover:text-blue-500 transition-colors duration-200">
                        <Link to={ROUTES.REQUESTS} className="flex items-center gap-4">
                            <img src={RequestIcon} alt="Заявки" className="w-5 h-5" />
                            <span className='text-white'>Заявки</span>
                        </Link>
                    </li>
                    <li className="hover:text-blue-500 transition-colors duration-200">
                        <Link to={ROUTES.BRIGADES} className="flex items-center gap-4">
                            <img src={RequestIcon} alt="Бригады" className="w-5 h-5" />
                            <span className='text-white'>Бригады</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </section>
    )
}