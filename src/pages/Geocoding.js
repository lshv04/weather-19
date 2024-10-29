import React from 'react';
import useFetch from '../hooks/useFetch';
import { useSearchParams, Link } from 'react-router-dom';
import './Geocoding.css'; // Importando o CSS

const options = {};

const Geocoding = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query'); // Captura o parâmetro 'query' da URL

  const { data, loading, error } = useFetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=797703c9bbce7164cfab34943034bf2b`, options
  );

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error.message}</h2>;
  }

  return (
    <div className="geocoding-container">
      <h1 className="geocoding-title">Search Results for "{query}"</h1>
      {data && data.length > 0 ? (
        <div className="row geocoding-grid">
          {data.map((item, index) => (
            <div key={index} className="col-12 col-md-6 mb-4">
              <div className="geocoding-item p-3">
                <h2>{item.name}, {item.country}</h2>
                <p>State: {item.state}</p>
                <p>Latitude: {item.lat}, Longitude: {item.lon}</p>
                {/* Botão Bootstrap para redirecionar para a página Detail */}
                <Link to={`/detail/${item.name}/${item.lat}/${item.lon}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="geocoding-no-results">No results found.</p>
      )}
    </div>
  );
};

export default Geocoding;
