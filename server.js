const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const TARGET_BASE_URL = 'http://82.41.64.49:2028/free/6b88f91cd81fb7fd?uid=';

// Endpoint to process full UIDs (e.g., 123456789010)
app.get('/api/add-uid/:uid', async (req, res) => {
  const { uid } = req.params;

  if (!uid || uid.trim() === '') {
    return res.status(400).json({ success: false, message: 'Invalid UID provided.' });
  }

  const targetUrl = `${TARGET_BASE_URL}${uid}`;

  try {
    const response = await fetch(targetUrl);

    if (response.ok) {
      res.json({
        success: true,
        message: `UID ${uid} added successfully!`,
        uid: uid
      });
    } else {
      res.json({
        success: false,
        message: `Server returned error status (${response.status}) for UID ${uid}.`
      });
    }
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reach activation server.'
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
