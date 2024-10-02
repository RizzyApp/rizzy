import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from "./components/HomePage.jsx";

function App() {
  const [count, setCount] = useState(0)

 /* useEffect(() => {
    const getData = async () =>{
      const response = await fetch("/api/v1/WeatherForecast");
      const data = await response.json();
      console.log(data)
    }
    getData();
  }, []);  */

  return (
    <>
      <HomePage/>
    </>
  )
}

export default App
