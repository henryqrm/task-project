import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    limitAt: {
        type: Date,
    },
    status: {
        type: String,
        default: 'pending', // completed
    },
    priority: {
        type: Number,
        default: 3,
    },
    color: {
        type: String,
        default: '#C9DAEA',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Task', TaskSchema);