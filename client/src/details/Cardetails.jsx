// src/components/cars/CarDetails.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const response = await axios.get(`/api/car/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setCar(response.data);
            } catch (error) {
                console.error('Failed to fetch car details:', error.response.data.message);
            }
        };
        fetchCarDetails();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/car/delete/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            navigate('/cars');
        } catch (error) {
            console.error('Failed to delete car:', error.response.data.message);
        }
    };

    return car ? (
        <div>
            <h2>{car.title}</h2>
            <p>{car.description}</p>
            {car.images && car.images.map((image, index) => (
                <img key={index} src={image} alt={car.title} style={{ width: 200 }} />
            ))}
            <button onClick={() => navigate(`/car/update/${id}`)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    ) : (
        <p>Loading car details...</p>
    );
};

export default CarDetails;
