import axios from "axios";
import  { useEffect, useState } from "react";

const useGettingLocation = (lat, lng) => {
  const [location, setLocation] = useState({ city: "", country: "" });

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/weather-data/getWeatherDataByLocation?lat=${lat}&lng=${lng}`);
        const address = response.data.address;
        const city = address.city || address.town || address.village || "";
        const country = address.country || "";
        setLocation({ city, country });
      } catch (error) {
        console.error("Location not found:", error);
      }
    };

    if (lat && lng) {
      fetchLocation();
    }
  }, [lat, lng]);

  return location;
};

export default useGettingLocation;
const useGettingLocaltemperature = () => {
  const [temperature,setTemperature] = useState(null);
  useEffect(()=> {
    const fetchTemperature = async () => {
      try{

      } catch(error) {
        
      }
    }
  })

}
