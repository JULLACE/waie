import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function getInfo(ingredient) {
    try {
        const result = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {"role": "user", "content": "write 1-2 sentences of what " + ingredient + " is"},
            ],
            max_tokens: 50,
          });
        const info = result.choices[0].message["content"];
        console.log(info);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// getInfo("peanut butter");

export async function getIngredients(ingredientList) {
    try {
        const result = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {"role": "user", "content": "Convert \"" + ingredientList + "\" to an array of ingredients in English, separating by commas but keeping multi-word ingredients intact"},
            ],
        });
        const message = result.choices[0].message;
        const content = JSON.parse(message.content);
        console.log(content);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// getIngredients("apples peanut butter ice-cream");
// getIngredients("苹果花生黄油冰淇淋");

export async function getdietaryRestrictions(ingredientList) {
    try {
        const result = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {"role": "user", "content": "List any allergies and dietary restrictions associated with the ingredients in \"" + ingredientList + "\" in an array"},
            ],
        });
        const message = result.choices[0].message;
        const content = JSON.parse(message.content);
        console.log(content);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// getdietaryRestrictions([ 'apple', 'peanut butter', 'ice cream' ])