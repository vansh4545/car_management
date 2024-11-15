import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';

import Home from './home/home';
import Login from './components/account/login';
import Signup from './components/account/signup';
import CarList from './components/list/carlist';
import CarDetails from './details/Cardetails';
import CreateCar from './components/create/CreateCar';
import UpdateCar from './components/create/Update';
import Header from './components/header/header';
import DataProvider from './context/DataProvider';
//import Home from './home/home';

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? (
    <>
      <Header isAuthenticated={isAuthenticated} />
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter>
        <div style={{ marginTop: 64 }}>
          <Routes>
            {/* Authentication Routes */}
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
             <Route path="/signup" element={<Signup />} /> 

            {/* Public Routes */}
            <Route path="/" element={<Login isAuthenticated={isAuthenticated} />} />

            {/* Car Management Routes (Protected) */}
            <Route path="/cars" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/cars" element={<Home />} /> {/* List of cars */}
            </Route>

            <Route path="/car/create" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/car/create" element={<CreateCar />} /> {/* Create a new car */}
            </Route>

            <Route path="/car/:id" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/car/:id" element={<CarDetails />} /> {/* View car details */}
            </Route>

            <Route path="/car/update/:id" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/car/update/:id" element={<UpdateCar />} /> {/* Update car */}
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
