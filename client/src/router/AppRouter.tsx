import { Route, Routes } from 'react-router-dom'
import { ROUTES } from './constants'
import { LoginPage } from '../pages/LoginPage'
import { EmployeePage } from '../pages/EmployeePage'
import BrigadeManagementPage from '../pages/BrigadeManagementPage'
import RequestManagementPage from '../pages/RequestManagementPage'


export const AppRoutes = () => {
    return (
        <Routes>
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.MAIN} element={<EmployeePage />} />
            <Route path={ROUTES.BRIGADES} element={<BrigadeManagementPage />} />
            <Route path={ROUTES.REQUESTS} element={<RequestManagementPage />} />
        </Routes>
    )
}