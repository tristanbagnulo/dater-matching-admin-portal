import React, {useState, useEffect} from 'react';
import './App.css';
import Dropdown from './Dropdown';

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

//TODO - Replace this options data with the Dater data from the PG sql table.
// Make the lable their name. Make the value their dater_id (UUID) 




// const options: Option[] = [
//   { dater_id: 1, values: { first_name: 'John', last_name: 'Doe', gender: 'Male', dietary_restrictions: 'None', availabilities: 'Mon-Fri' } },
//   { dater_id: 2, values: { first_name: 'Jane', last_name: 'Doe', gender: 'Female', dietary_restrictions: 'Vegetarian', availabilities: 'Tue-Thu' } },
//   { dater_id: 3, values: { first_name: 'Sam', last_name: 'Smith', gender: 'Non-binary', dietary_restrictions: 'Gluten-free', availabilities: 'Wed-Sun' } },
// ]


const App: React.FC = () => {

  const [options, setOptions] = useState<Option[]>([]);
  const [firstSelection, setFirstSelection] = useState<Option | null>(null);


  // Fetch daters from the backend
  useEffect(() => {
    const fetchDaters = async () => {
      try {
        const response = await fetch('http://localhost:3100/api/daters');
        const data = await response.json();
        // Transform the fetched data into the Option format
        const fetchedOptions = data.map((user: any) => ({
          dater_id: user.dater_id,
          values: {
            first_name: user.first_name,
            last_name: user.last_name,
            gender: user.gender,
            dietary_restrictions: user.dietary_restrictions,
            availabilities: user.availabilities,
          },
        }));
        setOptions(fetchedOptions);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchDaters();
  }, []);


  const handleFirstSelect = (selectedOption: Option | null) => {
    setFirstSelection(selectedOption);
  }

  return (
    <div className="App">
      <h1>Select First Dater</h1>
      <Dropdown options={options} onSelect={handleFirstSelect}/>
      {firstSelection && (
        <>
          <h1>Select Second Dater</h1>
          <Dropdown options={options} onSelect={(option) => console.log(`Second dropdown selected: ${option}`)}/>
        </>
      )}
    </div>
  );
}

export default App;
