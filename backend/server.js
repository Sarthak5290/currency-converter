const express = require("express");
const cors = require("cors");
// const fetch = require('node-fetch');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/convert", async (req, res) => {
  const { from, to, amount } = req.query;
  const API_KEY = process.env.API_KEY;

  try {
    // Use the API key and request URL for fetching exchange rates
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${from}`
    );
    const data = await response.json();

    // Check if the 'to' currency exists in the rates
    const rate = data.conversion_rates[to];
    if (!rate) {
      return res.status(400).json({ error: "Invalid currency code" });
    }

    // Calculate the converted amount
    const convertedAmount = rate * amount;
    res.json({ convertedAmount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching currency data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
