import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './components/Admin';
import Index from './components/index';
import Blog from './components/blog';
import Contact from './components/contact';
import Service from './components/service';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import SignalRLogout from './components/SignalRLogout';
import ForgotPassword from './components/ForgotPassword';
import { AppProvider } from './components/AppContext';
import UserActivityTracker from './components/UserActivityTracker';
import Logout from './components/Logout';


function App() {
  return (
    <AppProvider>
      <UserActivityTracker />
      <Router>
        <SignalRLogout />
        <Routes>
          <Route path="/index" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Service />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<Admin />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
