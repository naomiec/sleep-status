import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    expiresIn: { type: Number, required: true },
    tokenType: { type: String, required: true },
    lastUpdated: { type: Date, default: Date.now }
});

export const Token = mongoose.model('Token', tokenSchema);