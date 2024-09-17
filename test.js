const axios = require('axios');

const apiUrl = 'http://localhost:5000/api';

// Example function to get all books
const getAllBooks = async () => {
  try {
    const response = await axios.get(`${apiUrl}/books`);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

// Call functions to test
getAllBooks();
