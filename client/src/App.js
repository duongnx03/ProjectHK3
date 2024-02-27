import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './components/Admin';


function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Admin/>} />
      </Routes>
      
    </div>
  );
}

export default App;
