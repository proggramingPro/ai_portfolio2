require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { OpenAI } = require('openai'); // Import from OpenAI package

const app = express();

app.use(cors());
app.use(express.json());

// Initialize OpenAI with API key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// AI Chatbot API
app.post('/api/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // Using GPT-3.5 model
            messages: [{ role: 'user', content: userMessage }],
        });
        res.json({ reply: response.choices[0].message.content });
    } catch (error) {
        console.error("Error in /api/chat:", error);
        res.status(500).json({ error: 'Error processing AI request' });
    }
});

// AI-Generated Project Descriptions
app.post('/api/generate-description', async (req, res) => {
    try {
        const { projectTitle } = req.body;
        const response = await openai.completions.create({
            model: 'gpt-3.5-turbo', // Using GPT-3.5 model
            prompt: `Write a short, engaging description for a project titled "${projectTitle}"`,
            max_tokens: 50,
        });
        res.json({ description: response.choices[0].text.trim() });
    } catch (error) {
        console.error("Error in /api/generate-description:", error);
        res.status(500).json({ error: 'Error generating project description' });
    }
});

// AI Resume Analyzer
const upload = multer({ dest: 'uploads/' });
app.post('/api/analyze-resume', upload.single('resume'), async (req, res) => {
    try {
        const resumeText = "Extracted text from uploaded resume"; // Use OCR or NLP for real extraction
        const response = await openai.completions.create({
            model: 'gpt-3.5-turbo', // Using GPT-3.5 model
            prompt: `Analyze the following resume and provide feedback:\n\n${resumeText}`,
            max_tokens: 100,
        });
        res.json({ feedback: response.choices[0].text.trim() });
    } catch (error) {
        console.error("Error in /api/analyze-resume:", error);
        res.status(500).json({ error: 'Error analyzing resume' });
    }
});

// AI-Powered Blog Generator
app.post('/api/generate-blog', async (req, res) => {
    try {
        const { topic } = req.body;
        const response = await openai.completions.create({
            model: 'gpt-3.5-turbo', // Using GPT-3.5 model
            prompt: `Write a short blog post about "${topic}".`,
            max_tokens: 200,
        });
        res.json({ blog: response.choices[0].text.trim() });
    } catch (error) {
        console.error("Error in /api/generate-blog:", error);
        res.status(500).json({ error: 'Error generating blog post' });
    }
});

// AI-Generated Testimonials
app.post('/api/generate-testimonial', async (req, res) => {
    try {
        const response = await openai.completions.create({
            model: 'gpt-3.5-turbo', // Using GPT-3.5 model
            prompt: 'Write a short, positive testimonial for a web developer.',
            max_tokens: 50,
        });
        res.json({ testimonial: response.choices[0].text.trim() });
    } catch (error) {
        console.error("Error in /api/generate-testimonial:", error);
        res.status(500).json({ error: 'Error generating testimonial' });
    }
});

// Visitor Counter
let visitorCount = 0;
app.get('/api/visitor-count', (req, res) => {
    visitorCount++;
    res.json({ count: visitorCount });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
