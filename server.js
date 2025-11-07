import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY;

// ---- TEXT GENERATION ----
app.post("/api/chat", async (req, res) => {
  try {
    const { prompt } = req.body;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;
    const body = {
      contents: [{ parts: [{ text: prompt }] }],
    };
    const response = await axios.post(url, body, {
      headers: { "Content-Type": "application/json" },
    });
    const output = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Babu amsa daga AI.";
    res.json({ reply: output });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ---- IMAGE GENERATION ----
app.post("/api/image", async (req, res) => {
  try {
    const { prompt } = req.body;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    const body = {
      contents: [{ parts: [{ text: `Create an image of: ${prompt}` }] }],
    };
    const response = await axios.post(url, body, {
      headers: { "Content-Type": "application/json" },
    });
    const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Babu hoton da aka samo.";
    res.json({ image: text });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Image generation error" });
  }
});

app.listen(3000, () => console.log("✅ AI Server running on port 3000"));
