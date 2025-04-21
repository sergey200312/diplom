import React, { useState } from 'react';
import useInput from './useInput';
import useDebounce from './useDebounce';

export interface EmployeeOption {
    id: number;       
    fullName: string; 
    phone?: string; 
    specialization?: string;
}

const useDropdown = (employees: EmployeeOption[], delay: number = 300) => {
    const searchTerm = useInput('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeOption | null>(null);
    const debouncedSearchTerm = useDebounce(searchTerm.value, delay);

    const filteredEmployees = employees.filter(emp =>
        emp.fullName.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );

    const handleBlur = () => {
        setTimeout(() => setIsOpen(false), 200); 
    };

    const handleFocus = () => {
        setIsOpen(true);
    };

    const handleSelect = (employee: EmployeeOption) => {
        setSelectedEmployee(employee);
        searchTerm.setValue(employee.fullName);
        setIsOpen(false);
    };

    return {
        isOpen,
        searchTerm,
        filteredEmployees,
        selectedEmployee, 
        handleBlur,
        handleFocus,
        handleSelect,
    };
};

export default useDropdown;