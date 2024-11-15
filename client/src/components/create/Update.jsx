// src/components/cars/UpdateCar.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateCar = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState({ carType: '', company: '', dealer: '' });
    const [images, setImages] = useState([]);
    const [existingImages, setExistingImages] = useState([]);

    useEffect(() => {
        // Fetch existing car details
        const fetchCarDetails = async () => {
            try {
                const response = await axios.get(`/api/car/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                const car = response.data;
                setTitle(car.title);
                setDescription(car.description);
                setTags(car.tags);
                setExistingImages(car.images || []);
            } catch (error) {
                console.error('Failed to fetch car details:', error.response.data.message);
            }
        };

        fetchCarDetails();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('tags', JSON.stringify(tags));

        // Append new images to the form data
        images.forEach((image) => formData.append('images', image));

        try {
            await axios.put(`/api/car/update/${id}`, formData, {
                headers: { 
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Car updated successfully');
            navigate(`/car/${id}`);
        } catch (error) {
            console.error('Failed to update car:', error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Update Car</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Car Type"
                    value={tags.carType}
                    onChange={(e) => setTags({ ...tags, carType: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Company"
                    value={tags.company}
                    onChange={(e) => setTags({ ...tags, company: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Dealer"
                    value={tags.dealer}
                    onChange={(e) => setTags({ ...tags, dealer: e.target.value })}
                />
                
                <div>
                    <h4>Existing Images</h4>
                    {existingImages.map((image, index) => (
                        <img key={index} src={image} alt={`Car ${index}`} style={{ width: 100, margin: '5px' }} />
                    ))}
                </div>
                
                <input
                    type="file"
                    multiple
                    onChange={(e) => setImages([...e.target.files])}
                    accept="image/*"
                />
                <button type="submit">Update Car</button>
            </form>
        </div>
    );
};

export default UpdateCar;
