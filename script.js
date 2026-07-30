const express = require('express');
const app = express();

app.use(express.json());

// Target URL structure
const BASE_URL = 'http://82.41.64.49:2028/free/6b88f91cd81fb7fd?uid=';

// API route to attach UID and fetch result behind the scenes
app.get('/api/get-data/:uid', async (req, res) => {
  const { uid } = req.params;

  if (!uid) {
    return res.status(400).json({ error: 'UID is required' });
  }

  const targetUrl = `${BASE_URL}${uid}`;

  try {
    // Fetch data from the target server directly on your backend
    const response = await fetch(targetUrl);
    const data = await response.text();

    // Send the target's response back to your website
    res.send(data);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch data from target URL' });
  }
});

// ALWAYS KEEP THIS AT THE BOTTOM FOR RENDER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
