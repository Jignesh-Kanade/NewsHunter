const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const NEWS_API_KEY = process.env.NEWSDATA_API_KEY;

// Fetch from Economic Times, The Hindu, NDTV
app.get("/news", async (req, res) => {
    try {
        const sources = [
            { name: "The Economic Times", domain: "economictimes.indiatimes.com" },
            { name: "The Hindu", domain: "thehindu.com" },
            { name: "NDTV", domain: "ndtv.com" },
        ];

        const requests = sources.map((s) =>
            axios.get("https://newsdata.io/api/1/news", {
                params: {
                    apikey: NEWS_API_KEY,
                    domainurl: s.domain,
                    language: "en",
                    country: "in",
                },
            })
        );

        const responses = await Promise.all(requests);

        const formattedData = {};
        sources.forEach((s, i) => {
            formattedData[s.name] = responses[i].data.results || [];
        });

        res.json(formattedData);
    } catch (error) {
        console.error("Backend error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch news" });
    }
});

const PORT = 5000;
app.listen(PORT, () =>
    console.log(`✅ Server running at http://localhost:${PORT}`)
);

