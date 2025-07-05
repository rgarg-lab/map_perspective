const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files (like index.html) from public/
app.use(express.static(path.join(__dirname, 'public')));

// Optional test route
app.get('/ping', (req, res) => {
  res.send('✅ Server is running');
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
