import './App.css';
import Geocoding from './pages/Geocoding';
import Home from './pages/Home';
import Detail from './pages/Detail'; // Importando a página Detail
import Extra from './pages/Extra'; // Importando a página Extra
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbarone from './components/Navbar';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
      <Router>
       
       <Navbarone/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/geocoding" element={<Geocoding />} />
          <Route path="/detail/:name/:lat/:lon" element={<Detail />} /> {/* Rota dinâmica com name */}
          <Route path="/extra/:lat/:lon" element={<Extra />} /> {/* Rota para a página Extra */}
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
