import React, {useState, useEffect} from 'react';
import './App.css';
import Dropdown from './Dropdown';

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


  const handleFirstSelect = (selectedOption: Option | null) => {
    setFirstSelection(selectedOption);
  }

  const handleSecondSelect = (selectedOption: Option | null) => {
    setSecondSelection(selectedOption);
  }

  return (
    <div className="App">
      <h1>Select First Dater</h1>
      <Dropdown options={options} onSelect={handleFirstSelect}/>
      {firstSelection && (
        <>
          <h1>Select Second Dater</h1>
          <Dropdown options={options} onSelect={handleSecondSelect}/>
        </>
      )}

      {secondSelection && firstSelection && (
        <>
          <h1>Availabilities of these Daters:</h1>
          <ul>
            <li></li>
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
