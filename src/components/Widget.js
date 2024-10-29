import React from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import './Widget.css'; // Importando o CSS para estilos
import Spinner from "react-bootstrap/Spinner";


const options = {};

// Função para definir a imagem de fundo com base no clima
const getBackgroundImage = (weatherMain) => {
  switch (weatherMain) {
    case 'Clear':
      return require('../assets/clear.avif');
    case 'Clouds':
      return require('../assets/clouds.avif');
    case 'Rain':
      return require('../assets/rain.avif');
    case 'Snow':
      return require('../assets/snow.avif');
    case 'Drizzle':
      return require('../assets/drizzle.avif');
    case 'Thunderstorm':
      return require('../assets/thunderstorm.avif');
    case 'Atmosphere':
      return require('../assets/atmosphere.avif');
    default:
      return require('../assets/atmosphere.avif'); // Imagem padrão caso o clima não seja encontrado
  }
};

const Widget = ({ lat, lon }) => {
  const { data, loading, error } = useFetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=797703c9bbce7164cfab34943034bf2b&units=metric`,
    options
  );

  if (loading)
    return (
      <div className="d-flex justify-content-center m-5 pt-3">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  if (error) {
    return <h2>Erro: {error.message}</h2>; // Exibe uma mensagem de erro, se houver
  }


  // Selecionando a imagem de fundo com base nas condições climáticas
  const backgroundImage = getBackgroundImage(data.weather[0].main);
  const weatherIconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  return (
    <div
      className="widget-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
      }}
    >
      <div className="widget-content">
        <h2>{data.name}, {data.sys.country}</h2>
        <img src={weatherIconUrl} alt={data.weather[0].description} className="weather-icon" />
        <p>{Math.round(data.main.temp)}°C</p>
        <p>{data.weather[0].description}</p>
        <p>Max: {Math.round(data.main.temp_max)}°C / Min: {Math.round(data.main.temp_min)}°C</p>
        {/* Botão para redirecionar para a página Detail com name, lat e lon */}
        <Link to={`/detail/${data.name}/${lat}/${lon}`} className="btn btn-primary mt-3">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Widget;
