import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

function App() {
  // const [count, setCount] = useState(0)
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/home"); // Update the URL
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Axios error:', error);
      }
    };

    fetchData();
  }, []);
  
  
  return (<>HOME</>);
}

export default App;
