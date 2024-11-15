// src/components/cars/CarList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CarList = () => {
    const [cars, setCars] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get('/api/cars', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setCars(response.data);
            } catch (error) {
                console.error('Failed to fetch cars:', error.response.data.message);
            }
        };
        fetchCars();
    }, []);

    const filteredCars = cars.filter((car) =>
        car.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <h2>My Cars</h2>
            <input
                type="text"
                placeholder="Search cars"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div>
                {filteredCars.map((car) => (
                    <div key={car._id}>
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

export default CarList;
