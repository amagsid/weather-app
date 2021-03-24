import WeatherInfo from "./WeatherInfo";

const City = ({ weather }) => {
  return (
    <div className="city">
      <WeatherInfo weather={weather} />
    </div>
  );
};

export default City;
