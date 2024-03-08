const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Replace 'your_bearer_token' with your actual bearer token
const bearerToken = "U_kIlqoptuDs_mYqvPxc1vVuDgmF_nxhcg9yR8-dFt4PHYyS";

// Define a function to fetch recipe data
const fetchRecipes = async () => {
  try {
    const apiUrl = 'https://apis-new.foodoscope.com/recipe-search/regions?searchText=Australian&subRegion=Angolan&pageSize=10';
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    return response.data.payload.data;
  } catch (error) {
    console.error('Error fetching recipes:', error.message);
    throw error;
  }
};

// Define a route to fetch and display recipe data
app.get('/recipes', async (req, res) => {
  try {
    const recipeData = await fetchRecipes();
    res.json({
      data: recipeData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recipes.',
    });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
