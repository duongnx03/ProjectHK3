import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AdminLogin from './components/Admin/AdminLogin';
import UserList from './components/Admin/UserList';
import BlogList from './components/Admin/BlogList';
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
import CreateBlog from './components/Admin/CreateBlog';
import EditBlog from './components/Admin/EditBlog';



function App() {
  return (

    <AppProvider>
      <UserActivityTracker />
      <Router>
        <SignalRLogout />
        <Routes>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/userlist" element={<UserList />} />
          <Route path="/admin/blogs" element={<BlogList />} />
          <Route path="/admin/createblog" element={<CreateBlog />} />
          <Route path="/admin/editblog/:id" element={<EditBlog />} />


          <Route path="/" element={<Index />} />
          <Route path="/index" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Service />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </AppProvider>

  );
}

export default App;
