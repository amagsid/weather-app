const WeatherDescription = ({
  weather: { name: city },
  weather: { weather: description },
  weather: {
    sys: { country },
  },
}) => {
  // const main = weather[0].main;
  const condition = description[0];
  return (
    <div className="description">
      <h3 className="city-country">
        {city}, <span> {country} </span>
      </h3>
      <p className="condition-main">{condition.main}</p>
      <p className="condition-description">{condition.description}</p>
    </div>
  );
};

const TempInfo = ({
  weather: {
    main: { temp_max: max, temp_min: min },
  },
  weather: {
    coord: { lat, lon },
  },
}) => {
  const toCelcius = (temp) => Math.floor(temp - 273.15);

  return (
    <div className="temp">
      <p>
        min temp:
        <span>
          {toCelcius(min)} {"\u00b0"}
        </span>
      </p>
      <p>
        max temp:
        <span>
          {toCelcius(max)} {"\u00b0"}
        </span>
      </p>
      <p>
        location:
        <span>
          {lat} , {lon}
        </span>
      </p>
    </div>
  );
};

const WeatherInfo = ({ weather }) => {
  return (
    <div className="weather">
      <WeatherDescription weather={weather} />
      <TempInfo weather={weather} />
    </div>
  );
};

export default WeatherInfo;
