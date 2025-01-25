const express = require('express');
const tesseract = require('node-tesseract-ocr');
const fileupload = require('express-fileupload')

const app = express();
app.use(fileupload())

const PORT = 3000;

// Tesseract configuration (UNNECESSARY I THINK)
const config = {
  lang: 'eng',  // Language of OCR (eng by default)
  oem: 1,       // OCR Engine mode
  psm: 3        // Page segmentation mode
};

// Route to fetch and convert the image
app.post('/', async (req, res) => {
  const imageUrl = req.query.imageurl;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const gotImage = req.files.image
  const langChoice = req.body.lang

  if (langChoice) config.lang = langChoice

  try {
    // Use Tesseract to recognize text from the image
    tesseract
      .recognize(gotImage.data, config)
      .then((text) => {
        console.log('OCR Result in', langChoice, ':', text);
        res.send(text);
      })
      .catch((error) => {
        console.error('OCR Error:', error.message);
        res.status(500).send('Error processing the image.');
      });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('An error occurred while processing the image.');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});