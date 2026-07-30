const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serves static HTML files

const TARGET_BASE_URL = 'http://82.41.64.49:2028/free/6b88f91cd81fb7fd?uid=';

// API Endpoint to submit UID
app.get('/api/add-uid/:uid', async (req, res) => {
  const { uid } = req.params;

  if (!uid || uid.trim() === '') {
    return res.status(400).json({ success: false, message: 'Invalid UID provided.' });
  }

  try {
    const targetUrl = `${TARGET_BASE_URL}${uid}`;
    const response = await fetch(targetUrl);

    if (response.ok) {
      res.json({
        success: true,
        message: `UID ${uid} has been successfully added!`,
        uid: uid
      });
    } else {
      // Handles 404s or non-200 responses from the external server
      res.json({
        success: false,
        message: `Failed to register UID (Server returned status ${response.status}).`
      });
    }
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({
      success: false,
      message: 'Could not connect to activation server.'
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
