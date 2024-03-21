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

// Serve static files from the "public/app" directory
app.use(express.static(path.join(__dirname, "../public/app")));

const corsOptions = {
    origin: ['http://howdidnaomisleep.us-west-1.elasticbeanstalk.com', 'http://localhost:3000'],
    optionsSuccessStatus: 200 
  };
  
app.use(cors(corsOptions));
app.use(express.json());


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


// Fitbit routes ------------------------------------------
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

// Function to refresh the token if it's expired
async function refreshTokenIfNeeded(userId: string) {
    const tokenData = await Token.findOne({ userId });
    if (!tokenData) {
        throw new Error('Token not found');
    }

    const { refreshToken, expiresIn } = tokenData;
    const tokenExpired = (Date.now() >= new Date(expiresIn).getTime());

    if (tokenExpired) {
        // Refresh the token
        const response = await axios({
            method: 'post',
            url: 'https://api.fitbit.com/oauth2/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')
            },
            data: `grant_type=refresh_token&refresh_token=${refreshToken}`
        });

        const { access_token, refresh_token, expires_in } = response.data;

        // Update the token in the database
        await Token.findOneAndUpdate(
            { userId },
            {
                accessToken: access_token,
                refreshToken: refresh_token,
                expiresIn: new Date(Date.now() + expires_in * 1000), // Convert expiresIn to a future date
            },
            { new: true }
        );

        return access_token;
    } else {
        return tokenData.accessToken;
    }
}

app.get("/api/sleep", async (req: Request, res: Response) => {
  const userId = "naomi";

  // Calculate yesterday's date
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const formattedDate = yesterday.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'

  try {
      const accessToken = await refreshTokenIfNeeded(userId);
      const tokenData = await Token.findOne({ userId });
      if (!tokenData) {
          return res.status(404).send('Token not found');
      }

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
      const accessToken = await refreshTokenIfNeeded(userId);
      const tokenData = await Token.findOne({ userId });
      if (!tokenData) {
          return res.status(404).send('Token not found');
      }

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

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/app/index.html'));
  });
