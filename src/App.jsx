import { useState } from 'react';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const apiKey = 'c072eceb519db63e599a7ff209b10ed7';

  const fetchWeather = async () => {
    if (!city){
      setError("City is required")
      setWeather(null);
      return;
    }

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      console.log(response.data)
      setWeather(response.data)
      setError("")
    } catch (error) {
      setError("City not found")
      setWeather(null)
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather();
  }
  return (
   <div className='min h-screen bg-blue-100 flex justify-center items-center'>
      <div className='bg-white p-8 rounded shadow-lg w-full max-w-md align-middle'>
        <h1 className='text-2xl font-bold mb-4 text-center'>Weather App</h1>
        <form onSubmit={handleSearch} className='mb-4'>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)}
          className="w-full p-2 vorder rounded mb-2 vorder-gray400" 
          placeholder="Enter city name"
          />
          <button type="submit" className='w-full bg-blue-500 text-white p-2 rounded'>Get Weather</button>
        </form>

        {
          error && <p className='text-red-500 text-center mt4'>{error}</p>
        }
        {
          weather && (
            <div className="mt-4 text-center">
              <h2 className='text-xl font-bold'>{weather.name}, {weather.sys.country}</h2>
              <p className='text-lg'>Temperature: {weather.main.temp}°C</p>
              <p className='text-lg'>Feels like: {weather.main.feels_like}°C</p>
              <p className='text-lg'>Weather: {weather.weather[0].description}</p>
              <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="weather icon" className='mx-auto' />
            </div>
          )
        }
      </div>
   </div> 
  )
}

export default App
