// src/components/home/Home.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './home.css'; // Import the CSS file

const Home = ({ isAuthenticated }) => {
    const [cars, setCars] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserCars = async () => {
            try {
                const response = await axios.get('/api/cars', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setCars(response.data);
            } catch (error) {
                console.error('Failed to fetch cars:', error.response.data.message);
            }
        };

        if (isAuthenticated) {
            fetchUserCars();
        }
    }, [isAuthenticated]);

    const filteredCars = cars.filter((car) =>
        car.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (car.tags && (
            car.tags.carType.toLowerCase().includes(searchQuery.toLowerCase()) ||
            car.tags.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            car.tags.dealer.toLowerCase().includes(searchQuery.toLowerCase())
        ))
    );

    return (
       
        <div className="home-container">
            <h2 className="h"> My Cars</h2>
           
            <div className="home-header">
                <input
                    type="text"
                    placeholder="Search by title, description, or tags"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                
            </div>
            <button className="create-car-button" onClick={() => navigate('/car/create')}>
            Create New Car
            </button>
            <div className="car-list">
                {filteredCars.map((car) => (
                    <div key={car._id} className="car-card">
                        <Link to={`/car/${car._id}`}>
                            <h3>{car.title}</h3>
                            <p>{car.description}</p>
                        </Link>
                    </div>
                ))}
            </div>
           
        </div>
        
      
        

    );
};

export default Home;
