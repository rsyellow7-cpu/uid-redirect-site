const express = require('express');
const app = express();

app.use(express.json()); // Allows parsing JSON data in request bodies

// Define your target base URL here
const BASE_URL = 'https://your-target-website.com/user/';

// Route 1: Using a URL path parameter (e.g., /redirect/12345)
app.get('/redirect/:uid', (req, res) => {
  const uid = req.params.uid;
  
  // Construct the full URL with the user's UID appended
  const targetUrl = `${BASE_URL}${uid}`;
  
  console.log(`Redirecting to: ${targetUrl}`);
  
  // Option A: Redirect the user directly to the new URL
  res.redirect(targetUrl);
  
  // Option B: Or send the constructed URL back to the user/client
  // res.json({ url: targetUrl });
});

// Route 2: Using query parameters (e.g., /add-uid?uid=12345)
app.get('/add-uid', (req, res) => {
  const uid = req.query.uid;
  
  if (!uid) {
    return res.status(400).send('UID is required');
  }

  const targetUrl = `${BASE_URL}${uid}`;
  res.redirect(targetUrl);
});

// START SERVER (Configured for Render with process.env.PORT)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
