import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEmployee } from './../../src/types/employee';
interface IModalState {
    isOpen: boolean,
    type: 'createEmployee' | 'editEmployee' | null,
    employeeData: IEmployee |  null
}

const initialState: IModalState = {
    isOpen: false,
    type: null,
    employeeData: null
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openCreateEmployeeModal(state) {
            state.isOpen = true
            state.type = 'createEmployee'
            state.employeeData = null
        },
        openEditEmployeeModal(state, action: PayloadAction<IEmployee>) {
            state.isOpen = true
            state.type = 'editEmployee'
            state.employeeData = action.payload
        },
        closeEmployeeModal(state) {
            state.isOpen = false
            state.type = null
            state.employeeData = null
        },
    }
})

export const {
    openCreateEmployeeModal,
    openEditEmployeeModal,
    closeEmployeeModal
} = modalSlice.actions
export default modalSlice.reducer