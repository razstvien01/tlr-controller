import { useState, useEffect } from "react";

import "./App.css";

function App() {
  // const [count, setCount] = useState(0)
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/api/home")  // Update the URL
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setData(data);
        console.log(data);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }, []);
  
  
  return (<>HOME</>);
}

export default App;
