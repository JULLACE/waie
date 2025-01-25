const waieRouter = require('express').Router()
const tesseract = require('node-tesseract-ocr');
const fileupload = require('express-fileupload');

waieRouter.use(fileupload()) // TODO: THIS GOES IN APP

// Tesseract configuration
const config = {
  lang: 'eng',  // Language of OCR (eng by default)
  oem: 1,       // OCR Engine mode
  psm: 3        // Page segmentation mode
};

waieRouter.get('/', async (request, response) => {
  // actually idk what a get would do here lol
  // prob getting specific ingredient request
})

waieRouter.post('/upload', async (request, response) => {
  if (!request.files || Object.keys(request.files).length === 0) {
    return response.status(400).send('No files were uploaded.').end();
  }

  const gotImage = request.files.image
  const langChoice = request.body.lang

  if (langChoice) config.lang = langChoice

  // Sends image buffer to tesseract for recognition and plaintext conversion 
  try {
    scannedText = await tesseract.recognize(gotImage.data, config)
    console.log('OCR Result...', scannedText)
  } catch (error) {
    console.error('Error:', error.message);
    response.status(500).send('An error occurred while processing the image.');
  }

  // then send to GPT for processing here ...
  // if certain possible allergens are within the food,
  // make it send a JSON in a specific strict format ??
})

module.exports = waieRouter