import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini AI
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn('Warning: GEMINI_API_KEY is not defined. AI Tutor will operate in fallback mock mode.');
    }
    aiClient = new GoogleGenAI({
      apiKey: key || 'MOCK_KEY',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// AI Git Tutor Assistant API Endpoint
app.post('/api/chat', async (req, res) => {
  const { prompt, history = [], lessonContext = '' } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  // If API key is missing, respond with highly descriptive local explanations (Offline Mode)
  if (!process.env.GEMINI_API_KEY) {
    return res.json({
      text: `[Offline Mode: AI Coach "Turing" is running locally]\n\nI can absolutely explain this! Git relies on three key areas: the **Working Directory** (your draft desk), the **Staging Area** (your shipping crate), and the **Local Repository** (your permanent secure filing cabinet).\n\nTo help you further with: "${prompt}", please configure your **GEMINI_API_KEY** in the Secrets panel on the right side of AI Studio!`
    });
  }

  try {
    const ai = getAiClient();
    
    // Construct robust context-aware system instruction
    const systemInstruction = `You are "Turing", a highly engaging, friendly, and expert Git & GitHub Mentor.
Your mission is to teach Git concepts to absolute beginners with zero prior command line knowledge.
Always use relatable real-life analogies (e.g., bakeries, filing cabinets, photcopiers, travel luggage).
Keep your language conversational, encourage active exploration, and structure responses with clean Markdown formatting (bolding key concepts, bullet lists, short readable blocks).
If relevant, here is the current lesson context: ${lessonContext}.
Do not write the final answers to quizzes or terminal challenges directly, but instead guide the user step-by-step. Let's learn!`;

    // Map history to parts if any
    const contents = [];
    history.forEach((msg: any) => {
      contents.push({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      });
    });
    contents.push({
      role: 'user',
      parts: [{ text: prompt }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text || 'I am ready to help you with Git!' });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to generate response from Git AI Coach. Please try again.' });
  }
});

// Start Full-Stack Server
async function startServer() {
  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
