import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'; // Importando Filler
import { Card, Accordion } from 'react-bootstrap';

// Registrando componentes e o plugin Filler no Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const options = {};

function Extra() {
  const { lat, lon } = useParams(); // Capturando lat e lon da URL

  const { data, loading, error } = useFetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=797703c9bbce7164cfab34943034bf2b&units=metric`,
    options
  );

  if (loading) {
    return <h2>Carregando...</h2>; // Exibe uma mensagem de carregamento
  }

  if (error) {
    return <h2>Erro: {error.message}</h2>; // Exibe uma mensagem de erro, se houver
  }

  // Função para formatar as datas
  const formatDate = (dt_txt) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const date = new Date(dt_txt);
    return date.toLocaleDateString('en-US', options);
  };

  // Agrupando a previsão por dia
  const forecastByDay = data.list.reduce((acc, item) => {
    const date = formatDate(item.dt_txt); // Obtendo a data formatada
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  // Preparando os dados para o gráfico
  const chartLabels = data.list.map(item => new Date(item.dt_txt).toLocaleTimeString());
  const chartData = data.list.map(item => item.main.temp);

  const chartOptions = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: chartData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true, // Ativando o preenchimento da área sob a linha
      }
    ],
  };

  return (
    <div className="container-fluid"> {/* Adicionada a classe container-fluid */}
      <h1>{data.city.name} - 5 Day Weather Forecast</h1> {/* Nome da cidade e descrição breve */}
      <p>Here is the 5-day weather forecast for {data.city.name}, updated every 3 hours. Scroll down to see detailed weather information.</p>

      <div style={{ maxHeight: '400px', maxWidth: '800px', width: '100%', margin: '0 auto' }}> {/* Ajuste inline do gráfico */}
        <Line
          data={chartOptions}
          options={{
            maintainAspectRatio: false, // Permite que o gráfico se ajuste ao tamanho do container
          }}
        />
      </div>

      {Object.keys(forecastByDay).map((day, index) => (
        <Card key={index} className="mb-3">
          <Card.Header>
            <h2>{day}</h2>
          </Card.Header>
          <Card.Body>
            <Accordion defaultActiveKey={null}> {/* Todos os itens fechados por padrão */}
              {forecastByDay[day].map((item, idx) => (
                <Accordion.Item eventKey={idx.toString()} key={idx}>
                  <Accordion.Header>
                    {new Date(item.dt_txt).toLocaleTimeString()}
                    <img
                      src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                      alt={item.weather[0].description}
                      style={{ marginLeft: '10px' }}
                    />
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>Temperature: {item.main.temp}°C</p>
                    <p>Feels Like: {item.main.feels_like}°C</p>
                    <p>Weather: {item.weather[0].description}</p>
                    <p>Wind Speed: {item.wind.speed} m/s</p>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Extra;
