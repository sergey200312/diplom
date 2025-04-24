import { EmployeeList } from './../../components/EmployeeList';
// modalSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEmployee } from '../../types/employee';

interface IBrigade {
  id: string
  name: string
  Employees: IEmployee[]
}

interface IModalState {
  isOpen: boolean;
  type: 'createEmployee' | 'editEmployee' | 'createBrigade' | 'confirm' | 'editBrigade' | null;
  employeeData: IEmployee | null;
  brigadeData: IBrigade | null;
}

const initialState: IModalState = {
  isOpen: false,
  type: null,
  employeeData: null,
  brigadeData: null
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<{
      type: 'createEmployee' | 'editEmployee' | 'createBrigade' | 'confirm' | 'editBrigade';
      employeeData?: IEmployee;
      brigadeData?: IBrigade;
    }>) {
      state.isOpen = true;
      state.type = action.payload.type;
      state.employeeData = action.payload.employeeData || null;
      state.brigadeData = action.payload.brigadeData || null;
    },
    closeModal(state) {
      state.isOpen = false;
      state.type = null;
      state.employeeData = null;
      state.brigadeData = null;
    },
  }
})

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;