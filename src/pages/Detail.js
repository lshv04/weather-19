import React from 'react';
import { useParams, Link } from 'react-router-dom'; // Importando Link para criar o redirecionamento
import useFetch from '../hooks/useFetch';
import { Card, Row, Col, Button } from 'react-bootstrap'; // Importando Button do Bootstrap
import './Detail.css'; // Importando o CSS
import Spinner from "react-bootstrap/Spinner";

const options = {};

function Detail() {
  const { name, lat, lon } = useParams(); // Obtendo os parâmetros da URL

  const { data, loading, error } = useFetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric`,
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


  // Função que retorna a URL da imagem de fundo com base no clima
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

  // Extraindo dados da API
  const { main, weather, wind, clouds, sys } = data;
  const weatherIconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  const backgroundImage = getBackgroundImage(weather[0].main); // Obtem a imagem de fundo com base no clima

  return (
    <div
      className="detail-container container-fluid"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Classe inline
      }}
    >
      <div className="detail-content">
        <h1>Weather Details for {name}</h1>
        <p>Coordinates: Latitude {lat}, Longitude {lon}</p>

        <Row className="mb-4">
          <Col>
            <Card className="h-100 text-white" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
              <Card.Header style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>General Information</Card.Header>
              <Card.Body>
                <Card.Title className='text-white'>{data.name} ({sys.country})</Card.Title>
                <Card.Text className='text-white'>
                  <img src={weatherIconUrl} alt={weather[0].description} />
                  Weather: {weather[0].description} ({weather[0].main})
                  <br />
                  Clouds: {clouds.all}% cover
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="h-100 text-white" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
              <Card.Header style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>Temperature Details</Card.Header>
              <Card.Body>
                <Card.Text className='text-white'>
                  Current Temperature: {main.temp}°C
                  <br />
                  Feels Like: {main.feels_like}°C
                  <br />
                  Min Temperature: {main.temp_min}°C
                  <br />
                  Max Temperature: {main.temp_max}°C
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <Card className="h-100 text-white" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
              <Card.Header style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>Wind</Card.Header>
              <Card.Body>
                <Card.Text className='text-white'>
                  Speed: {wind.speed} m/s
                  <br />
                  Direction: {wind.deg}°
                  <br />
                  Gust: {wind.gust ? `${wind.gust} m/s` : "No gust information"}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="h-100 text-white" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
              <Card.Header style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>Atmospheric Pressure & Humidity</Card.Header>
              <Card.Body>
                <Card.Text className='text-white'>
                  Pressure: {main.pressure} hPa
                  <br />
                  Humidity: {main.humidity}%
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <Card className="h-100 text-white" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
              <Card.Header style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>Sunrise & Sunset</Card.Header>
              <Card.Body>
                <Card.Text className='text-white'>
                  Sunrise: {new Date(sys.sunrise * 1000).toLocaleTimeString()}
                  <br />
                  Sunset: {new Date(sys.sunset * 1000).toLocaleTimeString()}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col className="text-center">
            {/* Botão que envia lat e lon para a página Extra.js */}
            <Link to={`/extra/${lat}/${lon}`}>
              <Button variant="primary">See Extra Information</Button>
            </Link>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Detail;
