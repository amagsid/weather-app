import { useState, useEffect, useRef } from "react";
import City from "./City.jsx";
import Feedback from "./Feedback";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [city, setCity] = useState("");
  const [clickCount, setClickCount] = useState(0);
  const [weather, setWeather] = useState(null);
  const [isLoading, setLoading] = useState(false);
  // error handling
  const [has400Error, set400Error] = useState(false);
  const [has404Error, set404Error] = useState(false);
  const didMount = useRef(false);

  const ApiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

  //data fetching//
  const getWeather = () => {
    setLoading(true);
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}`
    )
      .then((res) => {
        if (!res.ok) {
          if (res.status === 400)
            throw new Error("Please enter a city to show weather");
          else throw new Error("please enter a valid city name");
        } else return res.json();
      })
      .then((weather) => {
        setLoading(true);
        setWeather(weather);
        setLoading(false);
      })
      .catch((err) => {
        err === "Error: Please enter a city to show weather"
          ? set400Error(true)
          : set404Error(true);
      })
      .finally(() => {
        setLoading(false);
      });
    set400Error(false);
    set404Error(false);
  };

  //functionality//
  // fetch useEffect. I used the useRef hook here because I wanted to prevent useEffect from running on first render since that way it always returned an error
  useEffect(() => {
    if (didMount.current) getWeather();
    else didMount.current = true;
  }, [clickCount]);

  //setTimeout on 400 error feedback
  useEffect(() => {
    const timeout = setTimeout(() => {
      set400Error(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [has400Error]);

  //setTimeout on 404 error feedback
  useEffect(() => {
    const timeout = setTimeout(() => {
      set404Error(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [has404Error]);

  return (
    <div className="weather-app">
      {/* error handling */}
      {has400Error && (
        <Feedback
          className={"feedbcak error"}
          text={"Please provide a city to get weather data"}
        />
      )}
      {has404Error && (
        <Feedback
          className={"feedbcak error"}
          text={"Please enter a valid city name "}
        />
      )}
      {/* check input. if false always show feedback to insert one, if true, ask user to click on button */}
      {city ? (
        <Feedback
          className={"feedbcak start"}
          text={"click on show weather to see results "}
        />
      ) : (
        <Feedback
          className={"feedbcak start"}
          text={"enter a city name to show weather "}
        />
      )}

      {/* //form */}
      <div className="weather-app-form">
        {!city ? <FaSearch className="search-icon" /> : null}

        <input
          type="text"
          placeholder="       search city.."
          onChange={(e) => setCity(e.target.value)}
        />

        <button
          className="button"
          onClick={() => setClickCount(clickCount + 1)}
        >
          <span>show weather </span>
        </button>
      </div>
      {isLoading && <Feedback className={"loading"} loading={true} />}
      {weather && <City weather={weather} />}
    </div>
  );
};

export default Search;
