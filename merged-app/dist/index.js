"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const mongoConnect_1 = require("./mongoConnect");
const profiles_1 = __importDefault(require("./profiles"));
const token_1 = require("./models/mongo/token");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
(0, mongoConnect_1.connect)("calpoly");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Serve static files from the "public" directory
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
// Catch-all route to serve the frontend's index.html
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../public/app/index.html"));
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
// Fitbit routes ------------------------------------------
app.get("/auth", (req, res) => {
    const clientId = process.env.CLIENT_ID;
    const redirectUri = encodeURIComponent("http://localhost:3000/callback");
    const scope = encodeURIComponent("sleep oxygen_saturation");
    res.redirect(`https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&expires_in=604800`);
});
// Handle the callback from Fitbit
app.get("/callback", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code;
    try {
        const response = yield (0, axios_1.default)({
            method: 'post',
            url: 'https://api.fitbit.com/oauth2/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')
            },
            data: `clientId=${process.env.CLIENT_ID}&grant_type=authorization_code&redirect_uri=http://localhost:3000/callback&code=${code}`
        });
        const { access_token, refresh_token, expires_in, token_type } = response.data;
        const userId = "naomi";
        // Using findOneAndUpdate with upsert option
        yield token_1.Token.findOneAndUpdate({ userId }, // query
        {
            userId,
            accessToken: access_token,
            refreshToken: refresh_token,
            expiresIn: expires_in,
            tokenType: token_type
        }, // update
        { upsert: true, new: true } // options
        );
        return res.send('Authentication successful and token stored or updated.');
    }
    catch (error) {
        console.error('Error:', error);
        return res.status(500).send('An error occurred');
    }
}));
app.options("/api/sleep", (0, cors_1.default)());
app.get("/api/sleep", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = "naomi";
    // Calculate yesterday's date
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const formattedDate = yesterday.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
    try {
        const tokenData = yield token_1.Token.findOne({ userId });
        if (!tokenData) {
            return res.status(404).send('Token not found');
        }
        const { accessToken } = tokenData;
        const response = yield (0, axios_1.default)({
            method: 'get',
            // Use the calculated date for both start and end date to get yesterday's sleep data
            url: `https://api.fitbit.com/1.2/user/-/sleep/date/${formattedDate}/${formattedDate}.json`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        res.json(response.data);
    }
    catch (error) {
        console.error('Error retrieving token:', error);
        res.status(500).send('Failed to retrieve token');
        console.error('Error fetching sleep data:', error);
        res.status(500).send('Error fetching sleep data');
    }
}));
app.get("/api/spO2", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = "naomi";
    // Calculate yesterday's date
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const formattedDate = yesterday.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
    try {
        const tokenData = yield token_1.Token.findOne({ userId });
        if (!tokenData) {
            return res.status(404).send('Token not found');
        }
        const { accessToken } = tokenData;
        // Use the calculated date for fetching SpO2 data
        const response = yield (0, axios_1.default)({
            method: 'get',
            url: `https://api.fitbit.com/1/user/-/spo2/date/${formattedDate}.json`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        res.json(response.data);
    }
    catch (error) {
        console.error('Error fetching SpO2 data:', error);
        res.status(500).send('Failed to fetch SpO2 data');
    }
}));
// --------------------------------------------------------
app.get("/hello", (req, res) => {
    res.send("Hello, World");
});
app.get("/api/profiles/:userid", (req, res) => {
    const { userid } = req.params;
    profiles_1.default
        .get(userid)
        .then((profile) => res.json(profile))
        .catch((err) => res.status(404).end());
});
app.post("/api/profiles", (req, res) => {
    const newProfile = req.body;
    profiles_1.default
        .create(newProfile)
        .then((profile) => res.status(201).send(profile))
        .catch((err) => res.status(500).send(err));
});
app.put("/api/profiles/:userid", (req, res) => {
    const { userid } = req.params;
    const newProfile = req.body;
    profiles_1.default
        .update(userid, newProfile)
        .then((profile) => res.json(profile))
        .catch((err) => res.status(404).end());
});
