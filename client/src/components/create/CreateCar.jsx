// src/components/cars/CreateCar.js

import React, { useState } from 'react';
import axios from 'axios';

const CreateCar = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState({ carType: '', company: '', dealer: '' });
    const [images, setImages] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('tags', JSON.stringify(tags));
        images.forEach((image) => formData.append('images', image));

        try {
            await axios.post('http://localhost:8000/car/create', formData, {
                headers: { 
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Car created successfully');
        } catch (error) {
           // console.error('Failed to create car:', error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Create Car</h2>
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
                <input
                    type="file"
                    multiple
                    onChange={(e) => setImages([...e.target.files])}
                    accept="image/*"
                />
                <button type="submit">Create Car</button>
            </form>
        </div>
    );
};

export default CreateCar;
