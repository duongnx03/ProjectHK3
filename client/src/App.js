import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './components/Admin/Admin';
import BlogList from './components/Admin/BlogList';


function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/admin" element={<Admin/>} />
      <Route path="/admin/blogs" element={<BlogList/>} />
    
      </Routes>
      
    </div>
  );
}

export default App;
