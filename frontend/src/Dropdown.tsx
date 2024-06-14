import React, {useState} from 'react';

// Define the type for the dropdown options
interface Option {
    dater_id: number,
    values: {
        first_name: string, 
        last_name: string, 
        gender: string, 
        dietary_restrictions: string, 
        availabilities: string
        } 
}

// Define the props type for the Dropdown component
interface DropdownProps {
    options: Option[];
    onSelect: (selectedOption: Option | null) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(event.target.value);
    const selected = options.find(option => option.dater_id === selectedId) || null;
    setSelectedOption(selected);
    onSelect(selected);
  };

  return (
    <div>
      <select onChange={handleSelectChange}>
        <option value="">Select an option</option>
        {options.map(option => (
          <option key={option.dater_id} value={option.dater_id}>
            {option.values.first_name} {option.values.last_name}
          </option>
        ))}
      </select>
      {selectedOption && (
        <div>
          <p>Selected Option:</p>
          <p>First Name: {selectedOption.values.first_name}</p>
          <p>Last Name: {selectedOption.values.last_name}</p>
          <p>Gender: {selectedOption.values.gender}</p>
          <p>Dietary Restrictions: {selectedOption.values.dietary_restrictions}</p>
        </div>
      )}
    </div>
  );
};

export default Dropdown;