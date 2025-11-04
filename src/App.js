import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import WeatherApp from './WeatherApp.jsx';
import GetCoordinates from './promtWindow.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path='/' element={<GetCoordinates />}
          />
          <Route
            path='/weather'
            element={<WeatherApp />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
