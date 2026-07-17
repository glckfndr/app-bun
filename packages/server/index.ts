import express from 'express';
import type { Request, Response } from 'express';
import openai from 'openai';
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

const client = new openai.OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

app.get('/', (req: Request, res: Response) => {
   res.send('Hello, World! This is the server running with Bun and Express.');
   // res.send(process.env.TEST);
});

app.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello from the API!' });
});

app.post('/api/chat', async (req: Request, res: Response) => {
   const { prompt } = req.body;
   const response = await client.responses.create({
      model: 'gpt-4o-mini',
      input: prompt,
      temperature: 0.2,
      max_output_tokens: 100,
   });
   res.json({ message: response.output_text });
});
app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
