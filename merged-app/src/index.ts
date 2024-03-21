import express, { Request, Response } from "express";
import cors from "cors";
import axios from "axios";
import { connect } from "./mongoConnect";
import profiles from "./profiles";
import { Profile } from "./models/profile";
import { Token } from "./models/mongo/token";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

connect("calpoly");
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "../public")));
// Catch-all route to serve the frontend's index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/app/index.html"));
});

app.use(cors());
app.use(express.json());


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


// Fitbit routes ------------------------------------------
const refreshTokenIfNeeded = async (userId: string) => {
    const tokenData = await Token.findOne({ userId });
    if (!tokenData) {
      throw new Error('Token not found');
    }
  
    // Assuming you have a way to check if the token is expired
    if (isTokenExpired(tokenData.accessToken)) {
      // Refresh the token
      const response = await axios({
        method: 'post',
        url: 'https://api.fitbit.com/oauth2/token',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')
        },
        data: `grant_type=refresh_token&refresh_token=${tokenData.refreshToken}`
      });
  
      const { access_token, refresh_token, expires_in } = response.data;
  
      // Update the token in the database
      await Token.findOneAndUpdate(
        { userId },
        {
          accessToken: access_token,
          refreshToken: refresh_token,
          expiresIn: expires_in
        },
        { new: true }
      );
    }
  };

  function isTokenExpired(accessToken: string): boolean {
    const payloadBase64 = accessToken.split('.')[1];
    const decodedJson = Buffer.from(payloadBase64, 'base64').toString();
    const decoded = JSON.parse(decodedJson);
    const expiry = decoded.exp; // Assuming the decoded token has an 'exp' field with a Unix timestamp
    const now = Math.floor(Date.now() / 1000); // Current time in Unix timestamp
    return now > expiry; // Adjusted to use '>' to check if the current time is strictly after the expiry time
}


app.get("/auth", (req: Request, res: Response) => {
  const clientId = process.env.CLIENT_ID;
  const redirectUri = encodeURIComponent("http://localhost:3000/callback");
  const scope = encodeURIComponent("sleep oxygen_saturation");
  res.redirect(`https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&expires_in=604800`);
});

// Handle the callback from Fitbit
app.get("/callback", async (req: Request, res: Response) => {
  const code = req.query.code as string;
  try {
      const response = await axios({
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
      await Token.findOneAndUpdate(
          { userId }, // query
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
  } catch (error) {
      console.error('Error:', error);
      return res.status(500).send('An error occurred');
  }
});

app.options("/api/sleep", cors());
app.get("/api/sleep", async (req: Request, res: Response) => {
  const userId = "naomi";

  // Calculate yesterday's date
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const formattedDate = yesterday.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'

  try {
      const tokenData = await Token.findOne({ userId });
      if (!tokenData) {
          return res.status(404).send('Token not found');
      }
      const { accessToken } = tokenData;

      const response = await axios({
          method: 'get',
          // Use the calculated date for both start and end date to get yesterday's sleep data
          url: `https://api.fitbit.com/1.2/user/-/sleep/date/${formattedDate}/${formattedDate}.json`,
          headers: {
              'Authorization': `Bearer ${accessToken}`
          }
      });
      res.json(response.data);
  } catch (error) {
      console.error('Error retrieving token:', error);
      res.status(500).send('Failed to retrieve token');
      console.error('Error fetching sleep data:', error);
      res.status(500).send('Error fetching sleep data');
  }
});

app.get("/api/spO2", async (req: Request, res: Response) => {
  const userId = "naomi"; 

  // Calculate yesterday's date
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const formattedDate = yesterday.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'

  try {
      const tokenData = await Token.findOne({ userId });
      if (!tokenData) {
          return res.status(404).send('Token not found');
      }
      const { accessToken } = tokenData;

      // Use the calculated date for fetching SpO2 data
      const response = await axios({
          method: 'get',
          url: `https://api.fitbit.com/1/user/-/spo2/date/${formattedDate}.json`,
          headers: {
              'Authorization': `Bearer ${accessToken}`
          }
      });
      res.json(response.data);
  } catch (error) {
      console.error('Error fetching SpO2 data:', error);
      res.status(500).send('Failed to fetch SpO2 data');
  }
});

// --------------------------------------------------------

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.get("/api/profiles/:userid", (req: Request, res: Response) => {
    const { userid } = req.params;
  
    profiles
      .get(userid)
      .then((profile: Profile) => res.json(profile))
      .catch((err) => res.status(404).end());
  });

  app.post("/api/profiles", (req: Request, res: Response) => {
    const newProfile = req.body;
  
    profiles
      .create(newProfile)
      .then((profile: Profile) => res.status(201).send(profile))
      .catch((err) => res.status(500).send(err));
  });

app.put("/api/profiles/:userid", (req: Request, res: Response) => {
    const { userid } = req.params;
    const newProfile = req.body;
  
    profiles
      .update(userid, newProfile)
      .then((profile: Profile) => res.json(profile))
      .catch((err) => res.status(404).end());
  });