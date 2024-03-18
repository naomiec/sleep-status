import express, { Request, Response } from "express";
import cors from "cors";
import axios from "axios";
import { connect } from "./mongoConnect";
import profiles from "./profiles";
import { Profile } from "./models/profile";
import { Token } from "./models/mongo/token";

import dotenv from "dotenv";
dotenv.config();

connect("calpoly");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


// Fitbit routes ------------------------------------------

app.get("/auth", (req: Request, res: Response) => {
  const clientId = process.env.CLIENT_ID;
  const redirectUri = encodeURIComponent("http://localhost:3000/callback");
  res.redirect(`https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=sleep&expires_in=604800`);
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
      const userId = "naomi"; // Determine how you will identify users

      const tokenDocument = new Token({
          userId,
          accessToken: access_token,
          refreshToken: refresh_token,
          expiresIn: expires_in,
          tokenType: token_type
      });

      tokenDocument.save()
      .then(() => res.send('Authentication successful and token stored.'))
      .catch((error) => {
          console.error('Error saving token:', error);
          res.status(500).send('Failed to store token');
    });
      res.send('Authentication successful');
  } catch (error) {
      console.error('Error exchanging token:', error);
      res.status(500).send('Authentication failed');
  }
});

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