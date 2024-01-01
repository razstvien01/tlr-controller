import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([])
  
  useEffect(() => {
    
    const fetchData = async() => {
      console.log(import.meta.env.VITE_API_URL)
      
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}posts`)
        
        if(!response.ok){
          throw new Error('Network response was not okay')
        }
        
        const result = await response.json();
        
        console.log(result)
        
        setData(result)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    
    fetchData()

    return () => {
      
    }
  }, [])
  

  return (
    <>
      HELLO WOLRD 
    </>
  )
}

export default App
