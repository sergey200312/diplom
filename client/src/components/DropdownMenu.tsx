import { User } from 'lucide-react';
import { FC } from 'react';

type Employee = {
  id: string | number;
  fullName: string;
  specialization?: string;
};

interface DropdownMenuProps {
  searchTerm: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  isOpen: boolean;
  filteredEmployees: Employee[];
  onFocus: () => void;
  onBlur: () => void;
  onSelect: (employee: Employee) => void;
  placeholder?: string;
  disabled?: boolean;
};

export const DropdownMenu: FC<DropdownMenuProps> = ({
  searchTerm,
  isOpen,
  filteredEmployees,
  onFocus,
  onBlur,
  onSelect,
  placeholder = 'Поиск сотрудника...',
  disabled = false,
}) => {
  return (
    <div className="relative">
      <div className="flex items-center gap-2 border rounded-md p-2">
        <User className="text-gray-400" size={20} />
        <input
          type="text"
          value={searchTerm.value}
          onChange={searchTerm.onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full outline-none bg-transparent"
        />
      </div>

      {isOpen && filteredEmployees.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto bg-white shadow-lg rounded-md border border-gray-200">
          {filteredEmployees.map((employee) => (
            <li
              key={employee.id}
              onClick={() => {
                onSelect(employee);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
            >
              <span>{employee.fullName}</span>
              {employee.specialization && (
                <span className="text-sm text-gray-500">
                  {employee.specialization}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};