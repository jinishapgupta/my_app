const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

app.get("/api/restaurants", async (req, res) => {
  const { postcode } = req.query;
  try {
    const response = await axios.get(
      `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

app.listen(5000, () => {
  console.log("Proxy server running on http://localhost:5000");
});