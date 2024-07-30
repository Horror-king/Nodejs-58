const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const accessToken = 'key-50qe9h1Sy5NA9xN9HO3gkKNp2U90djP0ECejJ7h4gpUDDVzUPDv8olzskt9jaLk4LXgNoPN9fbv4xXBMG1zXZD39fuwu9Bjc'; // Replace with your actual access token

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

app.get('/tr', async (req, res) => {
  const prompt = req.query.prompt;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt parameter is required' });
  }

  try {
    const response = await axios.post(
      'https://api.getimg.ai/v1/essential-v2/text-to-image',
      { prompt: prompt },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error details:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
