const express = require('express');
const tesseract = require('node-tesseract-ocr');
const fileupload = require('express-fileupload')

const app = express();
app.use(fileupload())

const PORT = 3000;

// Tesseract configuration (UNNECESSARY I THINK)
const config = {
  lang: 'eng',  // Language of OCR
  oem: 1,       // OCR Engine mode
  psm: 3        // Page segmentation mode
};

// Route to fetch and convert the image
app.post('/', async (request, response) => {
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
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});