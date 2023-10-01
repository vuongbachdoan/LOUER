// Import React and useState, useEffect hooks
import React, {useState, useEffect} from 'react';
import { Text } from 'react-native';


const url = 'https://f298-123-21-48-217.ngrok-free.app/profile';

// Import React and useState, useEffect hooks
import React, {useState, useEffect} from 'react';

// Define a component named JsonScreen
const JsonScreen = () => {
  // Define a state variable to store the JSON data as an array
  const [jsonData, setJsonData] = useState([]);

  // Define a function to fetch the JSON data from the server
  const getJsonData = async () => {
    try {
      // Use fetch API to get the data from the /profile endpoint
      const response = await fetch(url + "/profile");
      // Check if the response is ok
      if (response.ok) {
        // Parse the response as JSON
        const data = await response.json();
        // Convert the _links object into an array of values
        const dataArray = Object.values(data._links);
        // Set the state variable with the JSON data array
        setJsonData(dataArray);
      } else {
        // Throw an error if the response is not ok
        throw new Error("Something went wrong");
      }
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };

  // Call the function when the component mounts
  useEffect(() => {
    getJsonData();
  }, []);

  // Return the JSX element for the component
  return (
    <div className="json-screen">
      <h1>JSON Screen</h1>
      {jsonData.length > 0 ? (
        // Display the JSON data array as a list
        <ul>
          {jsonData.map((item, index) => (
            <li key={index}>
              <p><strong>Link:</strong> {item.name}</p>
              <p><strong>href:</strong> {item.href}</p>
              <p><strong>hreflang:</strong> {item.hreflang}</p>
              <p><strong>title:</strong> {item.title}</p>
              <p><strong>type:</strong> {item.type}</p>
              <p><strong>deprecation:</strong> {item.deprecation}</p>
              <p><strong>profile:</strong> {item.profile}</p>
              <p><strong>templated:</strong> {item.templated.toString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        // Display a loading message
        <p>Loading...</p>
      )}
    </div>
  );
};

// Export the component
export default JsonScreen;
