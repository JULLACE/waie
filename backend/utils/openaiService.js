const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function getInfo(ingredient) {
    try {
        const result = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{
                "role": "user",
                "content": "Write 1-2 concise sentences of what " + ingredient + " is."
            }],
            response_format: { "type": "json_object" },
            max_tokens: 50,
        });
        
        const info = result.choices[0].message["content"];
        console.log(info);
        return info;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

// getInfo("peanut butter");

async function getIngredients(ingredientList) {
    try {
        const result = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{
                    "role": "user",
                    "content": "Convert \"" + ingredientList + "\" to an array of ingredients in English, separating by commas but keeping multi-word ingredients intact. The list may contain jumbled words, so ensure that you are only taking account actual ingredients. Please put this array into a JSON. For example, { 'ingredients': ['Milk', 'Cheese', 'Onion'] } Return an empty JSON if there are no words that may resemble proper ingredients."
                }],
            response_format: { "type": "json_object" }
        });

        const message = result.choices[0].message;
        const content = JSON.parse(message.content);
        console.log(content);
        return content;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

// getIngredients("apples peanut butter ice-cream");
// getIngredients("苹果花生黄油冰淇淋");

async function getDietaryRestrictions(ingredientList) {
    try {
        console.log('is this workg.innn...', ingredientList)
        const result = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{
                "role": "user", 
                "content": `${ingredientList}\nList any possible allergies and dietary restrictions associated with the ingredients into an array, and then put this array into a JSON. Please keep it concise. For example, { 'restrictions': ['Peanut Allergy', 'Not Gluten Free', 'Vegan'] }. Account for as many restrictions as possible associated with the list.`
            }],
            response_format: { "type": "json_object" },
        });

        const message = result.choices[0].message;
        const content = JSON.parse(message.content);
        console.log(content);
        return content;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

// getdietaryRestrictions([ 'apple', 'peanut butter', 'ice cream' ])

module.exports = {
    getInfo,
    getIngredients,
    getDietaryRestrictions,
}