"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const tokenSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true, unique: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    expiresIn: { type: Number, required: true },
    tokenType: { type: String, required: true },
    lastUpdated: { type: Date, default: Date.now }
});
exports.Token = mongoose_1.default.model('Token', tokenSchema);
