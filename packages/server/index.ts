import express from 'express';
import type { Request, Response } from 'express';
import openai from 'openai';
import z from 'zod';

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

const conversation = new Map<string, string>();

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

const chatSchema = z.object({
   prompt: z
      .string()
      .min(3, 'Prompt cannot be empty')
      .max(1000, 'Prompt is too long'),
   conversation_id: z.string().uuid('Invalid conversation ID format'),
});
app.post('/api/chat', async (req: Request, res: Response) => {
   const parseResult = chatSchema.safeParse(req.body);
   if (!parseResult.success) {
      res.status(400).json(parseResult.error.format());
      return;
   }
   try {
      const { prompt, conversation_id } = req.body;
      const response = await client.responses.create({
         model: 'gpt-4o-mini',
         input: prompt,
         temperature: 0.2,
         max_output_tokens: 100,
         previous_response_id: conversation.get(conversation_id) || undefined,
      });

      conversation.set(conversation_id, response.id);
      res.json({ message: response.output_text });
   } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
   }
});
app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
