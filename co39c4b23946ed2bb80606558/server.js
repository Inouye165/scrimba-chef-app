// server.js (with dynamic fetch fix — working version)
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/claude', async (req, res) => {
    const ingredients = req.body.ingredients;
    const prompt = `You are Chef Claude. Create a recipe using only: ${ingredients.join(", ")}. Include name, ingredients, and instructions.`;

    try {
        const fetch = (await import('node-fetch')).default;

        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'x-api-key': process.env.VITE_ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'claude-3-opus-20240229',
                max_tokens: 800,
                messages: [{ role: 'user', content: prompt }],
            })
        });

        const data = await response.json();
        res.json({ text: data.content?.[0]?.text ?? "No content received." });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get recipe' });
    }
});

app.listen(3001, () => console.log('✅ Server running on http://localhost:3001'));
