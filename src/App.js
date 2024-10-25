import './App.css';
import Geocoding from './pages/Geocoding';
import Home from './pages/Home';
import Detail from './pages/Detail'; // Importando a nova página
import Searchbar from './components/SearchBar';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Searchbar />
        <nav>
          <ul style={{ display: 'flex', gap: '10px', listStyle: 'none' }}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/geocoding">Geocoding</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/geocoding" element={<Geocoding />} />
          <Route path="/detail/:name/:lat/:lon" element={<Detail />} /> {/* Rota dinâmica com name */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
