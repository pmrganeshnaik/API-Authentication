import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

// User Authentication Detilas
const myUsername = "@ganesh57";
const myPassword = "@GANESHMR57";
const myAPIKey = "ba38a8b3-6dc8-40f7-af01-4fba8060790d";
const myBearerToken = "5d1014c9-67ce-45fa-b9ea-6e723283f0a3";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

//NO Authentication
app.get("/noAuth", async (req, res) => {
  try {
    const result = await axios.get(`${API_URL}random`);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    console.error("Failed to make request");
  }
});

// Basic Authentication
app.get("/basicAuth", async (req, res) => {
  try {
    const result = await axios.get(
      `${API_URL}all?page=2`,
      {
        auth: {
          username: myUsername,
          password: myPassword,
        },
      }
    );
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    console.error("Failed to make request");
  }
});

//API Key
app.get("/apiKey", async (req, res) => {
  try {
    const result = await axios.get(
      `${API_URL}filter?score=5&apiKey=${myAPIKey}`
    );
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    console.error("Failed to make request");
  }
});

//Bearer Token
app.get("/bearerToken", async (req, res) => {
  try {
    const result = await axios.get(
      `${API_URL}secrets/42`,
      {
        headers: {
          Authorization: `Bearer ${myBearerToken}`,
        },
      }
    );
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    console.error("Failed to make request");
  }
});

//Port Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
