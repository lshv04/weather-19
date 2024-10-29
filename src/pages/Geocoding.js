import React from 'react';
import useFetch from '../hooks/useFetch';
import { useSearchParams, Link } from 'react-router-dom';
import './Geocoding.css'; // Importando o CSS
import Spinner from "react-bootstrap/Spinner";

const options = {};

const Geocoding = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query'); // Captura o parâmetro 'query' da URL

  const { data, loading, error } = useFetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=797703c9bbce7164cfab34943034bf2b`, options
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
