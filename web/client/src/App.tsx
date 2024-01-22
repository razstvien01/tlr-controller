import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
// import "./App.css";

function App() {
  // const [count, setCount] = useState(0)
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/home"); // Update the URL
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Axios error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    // <main className="relative z-0 bg-primary">
    //   <div className="text-red-500 p-4 text-xl">
    //     {data["message"]}
    //   </div>
    // </main>
    <BrowserRouter>
    <h1>HELLLO</h1>
      <div className="relative z-0 bg-primary">
        <div className="relative z-0 text-red-500 p-4 text-xl">
          {data["message"]}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
