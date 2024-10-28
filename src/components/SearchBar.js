import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Searchbar = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); // Impede o comportamento padrão de recarregar a página
    if (inputValue.trim()) {
      // Redireciona para a página Detail com o valor do input como search param
      navigate(`/geocoding?query=${encodeURIComponent(inputValue)}`);
    }
    setInputValue('');
  };

  return (
    <div className="container g-0">
  <form onSubmit={handleSubmit} className="d-flex ">
    <div>
     
      <div className="d-flex flex-row gap-2">
      <input
        type="text"
        className="form-control"
        id="input"
        name="input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Weather in your city"
        style={{ border: 'none', boxShadow: 'none' }}
      />
       <button type="submit" className="btn btn-primary "><span><i className="bi bi-search"></i></span></button>
       </div>
    </div>
   
  </form>
</div>

 
  );
};

export default Searchbar;
