"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/mongo/profile.ts
const mongoose_1 = require("mongoose");
const profileSchema = new mongoose_1.Schema({
    userid: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    nickname: { type: String, trim: true },
    email: { type: String, trim: true }
}, { collection: "user_profiles" });
const ProfileModel = (0, mongoose_1.model)("Profile", profileSchema);
exports.default = ProfileModel;
