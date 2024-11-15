import Car from '../model/car_model.js'; // Import the Car model
import mongoose from 'mongoose';

// Create a new car
export const createCar = async (req, res) => {
    const { title, description, tags } = req.body;
    const userId = req.user.id; // assuming user ID is stored in req.user after authentication
    const imagePaths = req.files.map(file => file.path); // Get image file paths from uploaded files

    try {
        const newCar = new Car({
            userId,
            title,
            description,
            images: imagePaths,
            tags
        });
        await newCar.save();
        res.status(201).json({ message: 'Car created successfully', car: newCar });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create car', error: error.message });
    }
};

// Get all cars for the logged-in user
export const getAllCars = async (req, res) => {
    const userId = req.user.id; // Get user ID from authentication middleware

    try {
        const cars = await Car.find({ userId });
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve cars', error: error.message });
    }
};

// Get details of a specific car by ID
export const getCar = async (req, res) => {
    const { id } = req.params;

    try {
        const car = await Car.findById(id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve car', error: error.message });
    }
};

// Update a car's details
export const updateCar = async (req, res) => {
    const { id } = req.params;
    const { title, description, tags } = req.body;
    const imagePaths = req.files ? req.files.map(file => file.path) : null;

    try {
        const car = await Car.findById(id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        if (car.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized to update this car' });
        }

        // Update car details
        if (title) car.title = title;
        if (description) car.description = description;
        if (tags) car.tags = tags;
        if (imagePaths) car.images = imagePaths;

        await car.save();
        res.status(200).json({ message: 'Car updated successfully', car });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update car', error: error.message });
    }
};

// Delete a car
export const deleteCar = async (req, res) => {
    const { id } = req.params;

    try {
        const car = await Car.findById(id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        if (car.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized to delete this car' });
        }

        await car.deleteOne();
        res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete car', error: error.message });
    }
};
