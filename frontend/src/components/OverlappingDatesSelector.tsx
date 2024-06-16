import React, {SyntheticEvent, useState} from 'react';

interface OverlappingDatesSelectorProps {
    listOverlappingDates: string [];
    selectedDate: string | null;
    onSelectDate: (date: string | null) => void;
}

const OverlappingDatesSelector: React.FC<OverlappingDatesSelectorProps> = ({
    listOverlappingDates, 
    selectedDate,
    onSelectDate
}) => {

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedDateValue = event.target.value
        onSelectDate(selectedDateValue);
        // onCreateDate(selectedDateValue)
    }    

    return (
        <div>
            <select onChange={handleSelectChange} value={selectedDate || ''}>
                <option value="">Select a date</option>
                {listOverlappingDates.map(overlappingDate => (
                    <option key={overlappingDate} value={overlappingDate}>
                        {overlappingDate}
                    </option>
                ))}

            </select>

        </div>
    );
};

export default OverlappingDatesSelector;