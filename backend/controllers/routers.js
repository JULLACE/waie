const waieRouter = require('express').Router()
const tesseract = require('node-tesseract-ocr');
const fileupload = require('express-fileupload');
const { text } = require('express');

waieRouter.get('/', async (request, response) => {
    // actually idk what a get would do here lol
    // prob getting specific ingredient request
})

waieRouter.post('/upload', async (request, response) => {
  if (!request.files || Object.keys(request.files).length === 0) {
    return response.status(400).send('No files were uploaded.').end();
  }

  const gotImage = request.files.image

  try {
    scannedText = await tesseract.recognize(gotImage.data, config)
    console.log('OCR Result...', scannedText)
    response.send(scannedText)
  } catch (error) {
    console.error('Error:', error.message);
    response.status(500).send('An error occurred while processing the image.');
  }
})

waieRouter

module.exports = waieRouter