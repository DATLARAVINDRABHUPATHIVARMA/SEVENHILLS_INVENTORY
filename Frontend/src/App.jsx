import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Root from "./Utils/Root.jsx";
import Login from "./Pages/Login.jsx";
import ProtectedRoutes from "./Utils/ProtectedRoutes.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Categories from "./Components/Categories.jsx";
import Vendors from "./Components/Vendors.jsx";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/admin-dashboard" element={<ProtectedRoutes requiredRole={['admin']}><Dashboard/></ProtectedRoutes>}>
          <Route index element={<h1>Summary of Admin Dashboard</h1>} />
          <Route path="categories" element={<Categories />} />
          <Route path="products" element={<h1>Products</h1>} />
          <Route path="vendors" element={<Vendors />} />
          <Route path="orders" element={<h1>Orders</h1>} />
          <Route path="users" element={<h1>Users</h1>} />
          <Route path="profile" element={<h1>Profile</h1>} />
          <Route path="logout" element={<h1>Logout</h1>} />
        </Route>
        <Route path="/customer/dashboard" element={<h1>Customer Dashboard</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<p className="font-bold text-3xl mt-20 ml-20">Unauthorized</p>} />
      </Routes>
    </Router>
  )
}

export default App
