import * as dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error('Error: API key is not set.');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    candidateCount: 1,
    stopSequences: ["x"],
    maxOutputTokens: 2000,
    temperature: 1.0,
  },
});

//const prompt = "give step by step instructions on how to create a mern project";

const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: "Hello, I have 2 dogs in my house." }],
    },
    {
      role: "user",
      parts: [{ text: "One of them is golden retriever and other one a german shepherd" }],
    },
    // {
    //   role: "model",
    //   parts: [{ text: "Great to meet you. What would you like to know?" }],
    // },
  ],
});
(async () => {
  try {
    let result = await chat.sendMessageStream("How many dogs are in my house? and how are their personalities?");
    // let result = await chat.sendMessageStream("I have 2 dogs in my house.");
for await (const chunk of result.stream) {
  const chunkText = chunk.text();
  process.stdout.write(chunkText);
}
// result = await chat.sendMessageStream("How many dogs are in my house?");
for await (const chunk of result.stream) {
  const chunkText = chunk.text();
  process.stdout.write(chunkText);
}
    
  } catch (error) {
    console.error('Error generating content:', error);
  }
})();

