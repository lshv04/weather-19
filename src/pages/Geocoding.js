import React from 'react';
import useFetch from '../hooks/useFetch';
import { useSearchParams, Link } from 'react-router-dom';

const options = {};

const Geocoding = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query'); // Captura o parâmetro 'query' da URL

  const { data, loading, error } = useFetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=797703c9bbce7164cfab34943034bf2b`,
    options
  );

  if (loading) {
    return <h2>Carregando...</h2>; // Exibe uma mensagem de carregamento
  }

  if (error) {
    return <h2>Erro: {error.message}</h2>; // Exibe uma mensagem de erro, se houver
  }

  if (data && data.length === 0) {
    return <h2>Nenhum resultado encontrado para "{query}".</h2>; // Mensagem para array vazio
  }

  const formatName = (name) => {
    return name.replace(/\s+/g, '-').toLowerCase(); // Substitui espaços por hífens e converte para minúsculas
  };

  return (
    <div>
      <h1>Geocoding Resultados</h1>

      {data && (
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              {item.name}, {item.country} / {item.state} - Latitude: {item.lat}, Longitude: {item.lon}
              <Link to={`/detail/${formatName(item.name)}/${item.lat}/${item.lon}`}>
                Ver detalhes
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Geocoding;
