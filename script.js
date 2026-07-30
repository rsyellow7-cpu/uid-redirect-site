const express = require('express');
const app = express();

app.use(express.json());

// Your target base URL
const BASE_URL = 'http://82.41.64.49:2028/free/6b88f91cd81fb7fd?uid=';

// Endpoint that takes UID, calls the target URL behind the scenes, and returns the result
app.get('/process-uid/:uid', async (req, res) => {
  const uid = req.params.uid;

  if (!uid) {
    return res.status(400).json({ error: 'UID is required' });
  }

  const targetUrl = `${BASE_URL}${uid}`;

  try {
    // Make the request behind the scenes from your server
    const response = await fetch(targetUrl);
    const data = await response.text(); // or response.json() if the target returns JSON

    // Return the response back to your website's user without leaving your page
    res.json({
      success: true,
      uid: uid,
      targetUrl: targetUrl,
      result: data
    });
  } catch (error) {
    console.error('Error fetching target URL:', error);
    res.status(500).json({
      error: 'Failed to connect to the target server',
      details: error.message
    });
  }
});

// START SERVER (Configured for Render with process.env.PORT)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
