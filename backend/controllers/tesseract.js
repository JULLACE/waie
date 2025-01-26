const tesRouter = require('express').Router()
const { createWorker } = require('tesseract.js');
const gptService = require('../utils/openaiService')

tesRouter.get('/', async (request, response) => {
  const worker = await createWorker('eng', 1, {
    cachePath: './lang',
  })

  const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
  console.log('Processed:', text)
  await worker.terminate()

  response.send(`${text} \nand healthy!`)
})

tesRouter.post('/upload', async (request, response) => {
  if (!request.files || Object.keys(request.files).length === 0) {
    return response.status(400).send('No files were uploaded.');
  }

  let langChoice = request.body.lang ? request.body.lang : 'eng'

  const worker = await createWorker([`${langChoice}`], 1, {
    cachePath: './lang',
  });

  worker.setParameters({tessedit_pageseg_mode: 3})

  const gotImage = request.files.image

  const { data: { text } } = await worker.recognize(gotImage.data)
  console.log('Processed:', text)
  await worker.terminate()

  const ingredients = await gptService.getIngredients(text)

  // Extremely ugly hack for ensuring gpt does not do weird stuff with our key values
  let ingredientText = JSON.stringify(ingredients[Object.keys(ingredients)[0]])
  const dietary = await gptService.getDietaryRestrictions(ingredientText)
  const result = { ingredients: ingredients[Object.keys(ingredients)[0]], dietary: dietary[Object.keys(dietary)[0]] }

  response.json(result)
})

module.exports = tesRouter