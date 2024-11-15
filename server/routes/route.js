import express from 'express';
import { signupUser, loginUser } from '../controller/user_controller.js';
import { createCar, getAllCars, getCar, updateCar, deleteCar } from '../controller/car_controller.js';
import { authenticateToken } from '../controller/jwt_controller.js';
import upload from '../utils/upload.js';

const router = express.Router();

// User Authentication Routes
router.post('/signup', signupUser);
router.post('/login', loginUser);

// Car Management Routes
router.post('/car/create', authenticateToken, upload.array('images', 10), createCar); // Create a new car with up to 10 images
router.get('/cars', authenticateToken, getAllCars); // Get all cars for the logged-in user
router.get('/car/:id', authenticateToken, getCar); // Get a specific car's details
router.put('/car/update/:id', authenticateToken, upload.array('images', 10), updateCar); // Update a car's details
router.delete('/car/delete/:id', authenticateToken, deleteCar); // Delete a car

export default router;
