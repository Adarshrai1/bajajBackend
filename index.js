const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Middleware
app.use(bodyParser.json());

// Helper function to categorize data
const categorizeData = (data) => {
  const numbers = [];
  const alphabets = [];
  data.forEach(item => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (/^[a-zA-Z]$/.test(item)) {
      alphabets.push(item);
    }
  });

  const highestAlphabet = alphabets.length > 0 ? [alphabets.sort((a, b) => a.toLowerCase() > b.toLowerCase() ? -1 : 1)[0]] : [];

  return { numbers, alphabets, highestAlphabet };
};

// POST method for /bfhl
app.post('/bfhl', (req, res) => {
  const { data } = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      message: 'Invalid data format. Please provide an array.'
    });
  }

  const { numbers, alphabets, highestAlphabet } = categorizeData(data);
  const response = {
    is_success: true,
    user_id: "john_doe_17091999",
    email: "john@xyz.com",
    roll_number: "ABCD123",
    numbers,
    alphabets,
    highest_alphabet: highestAlphabet
  };

  res.json(response);
});

// GET method for /bfhl
app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
