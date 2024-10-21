const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const movieRoutes = require('./routes/movieRoutes');


const app = express();
app.use(cors());
const port = 3001;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', movieRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});