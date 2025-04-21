// modalSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEmployee } from '../../types/employee';

interface IBrigade {
  name: string;
  leader: IEmployee;
  members: IEmployee[];
  specialization: string;
}

interface IModalState {
  isOpen: boolean;
  type: 'createEmployee' | 'editEmployee' | 'createBrigade' | null;
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
    openCreateEmployeeModal(state) {
      state.isOpen = true;
      state.type = 'createEmployee';
      state.employeeData = null;
    },
    openEditEmployeeModal(state, action: PayloadAction<IEmployee>) {
      state.isOpen = true;
      state.type = 'editEmployee';
      state.employeeData = action.payload;
    },
    openCreateBrigadeModal(state) {
      state.isOpen = true;
      state.type = 'createBrigade';
      state.brigadeData = null;
    },
    closeModal(state) {
      state.isOpen = false;
      state.type = null;
      state.employeeData = null;
      state.brigadeData = null;
    },
  }
})

export const {
  openCreateEmployeeModal,
  openEditEmployeeModal,
  openCreateBrigadeModal,
  closeModal
} = modalSlice.actions;
export default modalSlice.reducer;