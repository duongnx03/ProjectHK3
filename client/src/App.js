import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AdminLogin from './components/Admin/AdminLogin';
import UserList from './components/Admin/UserList';
import BlogList from './components/Admin/BlogList';
import Index from './components/index';
import Blog from './components/blog';
import Service from './components/service';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import SignalRLogout from './components/SignalRLogout';
import ForgotPassword from './components/ForgotPassword';
import { AppProvider } from './components/AppContext';
import UserActivityTracker from './components/UserActivityTracker';
import Logout from './components/Logout';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import OrderQuantityForm from './components/OrderQuantityForm';
import OrderQuantityList from './components/OrderQuantityList';
import OrderWeightForm from './components/OrderWeightForm';
import OrderWeightList from './components/OrderWeightList';
import AddMembership from './components/AddMembership';
import MembershipList from './components/MembershipList';
import RenewMembership from './components/RenewMembership';
import OrderMembership from './components/OrderMembership';
import CreateBlog from './components/Admin/CreateBlog';
import EditBlog from './components/Admin/EditBlog';
import BlogDetail from './components/blogdetail';
import QRCodeGeneratormem from './components/QRCodeGeneratormem';
import QRCodeGeneratorquantity from './components/QRCodeGeneratorquantity';
import QRCodeGeneratorweight from './components/QRCodeGeneratorweight';
function App() {
  return (

    <div className="App">
    
    <AppProvider>
      <UserActivityTracker />
        <SignalRLogout />
        <Routes>
        <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/userlist" element={<UserList />} />
          <Route path="/admin/blogs" element={<BlogList />} />
          <Route path="/admin/createblog" element={<CreateBlog />} />
          <Route path="/admin/editblog/:id" element={<EditBlog />} />

          <Route path="/" element={<Index />} />
          <Route path="/index" element={<Index />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/service" element={<Service />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/addproduct" element={<AddProduct />} /> 
          <Route path="/editproduct" element={<EditProduct />} /> 
          <Route path="/orderquantityform" element={<OrderQuantityForm />} />
          <Route path="/orderquantitylist" element={<OrderQuantityList />} />
          <Route path="/orderweightform" element={<OrderWeightForm />} />
          <Route path="/orderweightlist" element={<OrderWeightList />} />
          <Route path="/addmembership" element={<AddMembership />} />
          <Route path="/membershiplist" element={<MembershipList />} />
          <Route path="/membershiplist/:membershipId" element={<QRCodeGeneratormem/>} />
          <Route path="/orderquantitylist/:orderQuantityId" element={<QRCodeGeneratorquantity/>} />
          <Route path="/orderweightlist/:orderWeightId" element={<QRCodeGeneratorweight/>} />
          <Route path="/renewmembership" element={<RenewMembership />} />
          <Route path="/ordermembership" element={<OrderMembership />} />
          <Route path="/ordermembership" element={<OrderMembership />} />


        </Routes>
    </AppProvider>
    </div>
  );
}

export default App;
