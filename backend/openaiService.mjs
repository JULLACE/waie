import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const completion = openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  store: true,
  messages: [
    {"role": "user", "content": "write 1-2 sentences of what peanut butter is, including any dietary restrictions"},
  ],
  max_tokens: 50,
});

completion.then((result) => console.log(result.choices[0].message));