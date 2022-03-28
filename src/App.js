import React,{ useState, useEffect} from 'react'

const api={
 key:"5fe935fc1f96f6b1f8e399148fed2139",
 base:"https://api.openweathermap.org/data/2.5/",
}

function App() {
    const [searchInput,setSearchInput]=useState("");
    const [searchCity,setSearchCity]=useState("");
    const [weatherInfo,setWeatherInfo]=useState("");
    const [loading,setLoading]=useState(false);
    const [errorMessage,setErrorMessage]=useState(false);

    useEffect(()=>{

        const fetchWeatherData=async ()=>{
            if(!searchCity) return
            setLoading(true);
            try {
                const url=`${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`
                const response= await fetch(url);
                const data=await response.json();
                if(response.ok){
                    // setWeatherInfo(JSON.stringify(data));
                    setWeatherInfo(`${data.name},${data.weather[0].description},${data.main.temp}`);
                    setErrorMessage("") 
                    // setWeatherInfo("")    
                } else {
                    setErrorMessage(data.message)
                }
                
            } catch (error) {
                setErrorMessage(error.message);
            }
            setLoading(false);
        };
        fetchWeatherData();
    },[searchCity]);

    const handleSubmit=(e)=>{
        e.preventDefault();
        setSearchCity(searchInput);
    };
  return (
    <div>
        <h2>THE WEATHER APP</h2>
    <form onSubmit={handleSubmit}>
        <input 
        type="text"
        placeholder='city'
         value={searchInput}
         onChange={(e)=>setSearchInput(e.target.value)}
          />
          <button>Search</button>
          </form>
          {loading ? (<div>Loading...</div>) : (<>{errorMessage ? (<div style={{color:"red"}}>{errorMessage}</div>): (<div>{weatherInfo}</div>)}</>
          )}
          
          
          
    </div>
  )
}

export default App
