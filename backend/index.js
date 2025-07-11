
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(bodyParser.json());


app.use('/sites', express.static(path.join(__dirname, 'generated-sites')));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


app.get('/', (req, res) => {
  res.send('CodeDrishti AI Backend is running');
});


app.post('/api/generate', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || prompt.trim() === '') {
    return res.status(400).json({ success: false, error: 'Prompt is required.' });
  }

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: `
You are a highly skilled professional front-end and UI/UX web developer.

Your task is to generate a complete, visually stunning, and fully responsive multi-page website project based on this idea:
"${prompt}"

✅ Design & Style Instructions:
1️⃣ Clean, minimal, and visually appealing design like Apple, Dribbble, Airbnb.
2️⃣ Use elegant typography, color palettes, soft gradients, rounded corners, drop shadows.
3️⃣ Fully responsive using Flexbox or CSS Grid.
4️⃣ Smooth hover effects, animations, and stylish buttons/cards.

✅ Must Generate:
- index.html (content & structure)
- style/style.css (styling, responsiveness, effects)
- js/script.js (basic interactivity)

✅ Response strictly in this JSON format inside a markdown code block:
\`\`\`json
{
  "projectName": "my-website",
  "files": [
    { "path": "index.html", "content": "<!DOCTYPE html>..." },
    { "path": "style/style.css", "content": "body { ... }" },
    { "path": "js/script.js", "content": "console.log('Hello!');" }
  ]
}
\`\`\`

Do NOT include any explanation or extra text—only valid JSON inside a code block.
      `,
    });

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const match = text.match(/```json([\s\S]*?)```/) || [null, text];
    const jsonText = match[1]?.trim() || text;

    let parsed;
    try {
      parsed = JSON.parse(jsonText);
    } catch (err) {
      console.error('❌ JSON Parse Failed:', jsonText);
      return res.status(500).json({ success: false, error: 'Invalid AI response format.' });
    }

    const projectName = parsed.projectName || 'website-project';
    const projectPath = path.join(__dirname, 'generated-sites', projectName);

    parsed.files.forEach(({ path: filePath, content }) => {
      const fullFilePath = path.join(projectPath, filePath);
      const dir = path.dirname(fullFilePath);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(fullFilePath, content, 'utf8');
      console.log(`✅ File created: ${fullFilePath}`);
    });

    res.status(200).json({
      success: true,
      message: '✅ Project generated successfully!',
      projectName: projectName,
      files: parsed.files,
      previewURL: `http://localhost:${PORT}/sites/${projectName}/index.html`, // ✅ Preview Link
    });

  } catch (error) {
    console.error('❌ Generation Error:', error);
    res.status(500).json({ success: false, error: 'Failed to generate project. Please try again later.' });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 InstaWeb AI backend running on http://localhost:${PORT}`);
});
