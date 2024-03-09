const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Replace 'your_bearer_token' with your actual bearer token
const bearerToken = "U_kIlqoptuDs_mYqvPxc1vVuDgmF_nxhcg9yR8-dFt4PHYyS";
var querytext;
var size;

axios.defaults.headers.common['Authorization'] = `Bearer ${bearerToken}`;



app.post('/search-api', (req, res) => {
    const { searchText, pageSize } = req.body;
    querytext = searchText;
    size = pageSize;
    console.log(querytext);
    res.json({ searchText, pageSize });
});


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

app.get('/data', async (req, res) => {
    try {
      // Specify the input parameter in the API request
      const apiUrl = 'https://098b-103-25-231-104.ngrok-free.app';
      const inputParam = 'https://i.ibb.co/T4hpKfW/test1.png';
  
      // Make a GET request to the API with the input parameter
      const response = await axios.get(apiUrl, {
        params: {
          input: inputParam,
        },
      });
  
      // Assuming the API response contains a JSON object
      const data = response.data;
  
      // Display the values in the response
      res.json(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('/report', async (req, res) => {
    try {
  
      // Log the image URL
    //   console.log('Received image URL:', imageUrl);
  
      // Make a POST request using Axios
      const response = await axios.post('https://61fc-103-25-231-104.ngrok-free.app/chat', {
        input: "https://i.ibb.co/T4hpKfW/test1.png",
      });
  
      // Log the response from the external API
      console.log('Response from external API:', response.data);
  
      // Send a response to the client
    //   res.json(response.data);

    if (response.data.CRP < 1) {
        const nutritionResponse = await axios.post('https://apis-new.foodoscope.com/recipe-search/recipesByNutrition?page=1&pageSize=10', {
        "energyMin": 0,
        "energyMax": 0,
        "carbohydratesMin": 0,
        "carbohydratesMax": 3,
        "fatMin": 0,
        "fatMax": 0,
        "proteinMin": 0,
        "proteinMax": 0
      });
      res.json(nutritionResponse.data.payload.data);
      } else {
        // Send the original response if the condition is not met
        res.json(response.data);
      }

    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('/recipeByIngredients', async (req, res) => {
    const response = await axios.post('https://apis-new.foodoscope.com/recipe-search/recipesByIngredient?page=0&pageSize=10', {
        "ingredientUsed": "cornstarch",
        "ingredientNotUsed": "water"
      });
      res.json(response.data);
  })
  
  

// Start the Express server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
