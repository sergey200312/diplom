import { Route, Routes } from 'react-router-dom'
import { ROUTES } from './constants'
import { LoginPage } from '../pages/LoginPage'
import { EmployeePage } from '../pages/EmployeePage'


export const AppRoutes = () => {
    return (
        <Routes>
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.MAIN} element={<EmployeePage />} />
        </Routes>
    )
}