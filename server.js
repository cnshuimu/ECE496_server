const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 5000;
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const { string } = require('prop-types');

// Use CORS middleware
app.use(cors());

app.use(express.json());

app.get('/', async (req, res) => {
    try {
      const filePath = path.join(__dirname, 'free-images.jpg');
      
      // Read the file
      const fileStream = fs.createReadStream(filePath);
  
      // Create FormData
      const formData = new FormData();
      formData.append('imagepageim[]', fileStream, 'free-images.jpg'); // Add the file stream
      formData.append('socialfollow', '1000000');
      formData.append('socialtype', 'fashion');
      formData.append('api', 'api');
      formData.append('submit', 'submit');
  
      console.log('Making request');
      
      // Make the POST request
      const response = await axios.post('https://pre.cm/scribe.php', formData, {
        headers: {
          ...formData.getHeaders(), // Set the headers from FormData
        },
      });
  
      console.log(response.data);
  
      // Send a response to the client
      res.send(JSON.stringify(response.data));
    } catch (error) {
      console.error('Error during the request:', error);
      res.status(500).send('An error occurred while processing the request.');
    }
  });

app.post('/', (req, res) => {
    const { message } = req.body;
    res.send(`Received message: ${message}`);
});

app.listen(port, () => {
    console.log(`Server is running on port number ${port}`);
});


