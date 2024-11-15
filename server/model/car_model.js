import mongoose from 'mongoose';

const carSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: {
        type: [String],  // Array of image URLs
        validate: [arrayLimit, '{PATH} exceeds the limit of 10'],
    },
    tags: {
        carType: {
            type: String,
            required: true,
        },
        company: {
            type: String,
            required: true,
        },
        dealer: {
            type: String,
            required: false,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Custom validator to ensure a maximum of 10 images
function arrayLimit(val) {
    return val.length <= 10;
}

const Car = mongoose.model('Car', carSchema);

export default Car;
