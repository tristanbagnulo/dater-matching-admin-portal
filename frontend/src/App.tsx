import React, {useState, useEffect, SyntheticEvent} from 'react';
import './App.css';
import Dropdown from './components/Dropdown';
import OverlappingDatesSelector from './components/OverlappingDatesSelector';

interface Option {
  dater_id: string,
  values: {
      first_name: string, 
      last_name: string, 
      gender: string, 
      dietary_restrictions: string, 
      availabilities: string,
      images: string
      } 
}

const App: React.FC = () => {

  const [options, setOptions] = useState<Option[]>([]);
  const [firstSelection, setFirstSelection] = useState<Option | null>(null);
  const [secondSelection, setSecondSelection] = useState<Option | null>(null);
  const [computedListOverlappingDates, setComputedListOverlappingDates] = useState<string[] | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  // Fetch daters from the backend
  useEffect(() => {
    const fetchDaters = async () => {
      console.log("Reached 1");
      
      try {
        console.log("Reached 2");
        
        const response = await fetch('http://localhost:3100/api/daters');
        const data = await response.json();
        // Transform the fetched data into the Option format
        const fetchedOptions = data.map((dater: any) => ({
          dater_id: dater.dater_id,
          values: {
            first_name: dater.first_name,
            last_name: dater.last_name,
            gender: dater.gender,
            dietary_restrictions: dater.dietary_restrictions,
            availabilities: dater.availabilities,
            images: dater.images
          },
        }));
        setOptions(fetchedOptions);
        console.log(fetchedOptions);
        
      } catch (error) {
        console.error('Error fetching daters:', error);
      }
    };

    fetchDaters();
  }, []);

  useEffect(() => {
    if (firstSelection && secondSelection) {
      const firstDaterAvailabilities = firstSelection.values.availabilities
        ? firstSelection.values.availabilities.split(',').map(substring => substring.trim())
        : [];
  
      const secondDaterAvailabilities = secondSelection.values.availabilities
        ? secondSelection.values.availabilities.split(',').map(substring => substring.trim())
        : [];
  
      const matchingStrings = firstDaterAvailabilities.filter(date => secondDaterAvailabilities.includes(date));
      setComputedListOverlappingDates(matchingStrings);
    }
  }, [firstSelection, secondSelection]);

  useEffect(() => {
    console.log('First Selection:', firstSelection);
    console.log('Second Selection:', secondSelection);
    console.log('Computed Dates:', computedListOverlappingDates);
  }, [firstSelection, secondSelection, computedListOverlappingDates]);
  
  

  const handleFirstSelect = (selectedOption: Option | null) => {
    setFirstSelection(selectedOption);
  }

  const handleSecondSelect = (selectedOption: Option | null) => {
    setSecondSelection(selectedOption);
  }

  const handleCreateDate = async () => {
    if (firstSelection && secondSelection && selectedDate) {
        try {

          console.log("Create Date is not yet implemented.");
          
          // const response = await fetch('http://localhost:3100/api/createDate', {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json'
          //   },
          //   body: JSON.stringify({
          //     dater_id_one: firstSelection.dater_id,
          //     dater_id_two: secondSelection.dater_id,
          //     date: selectedDate
          //   })
          // });
          // const data = await response.json();
          // console.log(data);
          //setSelectedDate(null); decide on reset later 
        } catch (error) {
          console.error('Error fetching daters:', error);
        }
      };
    }


  return(
    <div className="App">
      <h1>Select First Dater</h1>
      <Dropdown options={options} onSelect={handleFirstSelect}/>
      {firstSelection && (
        <>
          <h1>Select Second Dater</h1>
          <Dropdown options={options} onSelect={handleSecondSelect}/>
        </>
      )}
      {secondSelection && firstSelection && computedListOverlappingDates &&(
        <>
          <h1>Availabilities of these Daters:</h1>
          <OverlappingDatesSelector
            listOverlappingDates={computedListOverlappingDates} 
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        </>
      )}
      {selectedDate && (
        <div>
          <button onClick={handleCreateDate}>Create Date</button>
        </div>
      )}
    </div>
  );
}

export default App;
