import React from 'react';
import Widget from '../components/Widget';
import './Home.css';

function Home() {
  return (
    <div className="container-fluid home-container ">
      <div className="container ">
       <h1 className='p-3'>Weather Highlights</h1>
        <div className="row">
        <div className="col-12 mb-4">
            <Widget lat={-20.11055} lon={-43.05500} /> {/* Alvinópolis */}
          </div>
          <div className="col-12 mb-4">
            <Widget lat={48.8588897} lon={2.3200410217200766} /> {/* Paris */}
          </div>
          <div className="col-12 mb-4">
            <Widget lat={41.902782} lon={12.496366} /> {/* Rome */}
          </div>
          <div className="col-12 mb-4">
            <Widget lat={40.712776} lon={-74.005974} /> {/* New York */}
          </div>
          <div className="col-12 mb-4">
            <Widget lat={-33.868820} lon={151.209290} /> {/* Sydney */}
          </div>
          <div className="col-12 mb-4">
            <Widget lat={25.276987} lon={55.296249} /> {/* Dubai */}
          </div>
      
        </div>
      </div>
    </div>
  );
}

export default Home;
