const express = require('express');
const fileupload = require('express-fileupload')
const { createWorker } = require('tesseract.js');

const app = express();
app.use(fileupload())

const PORT = 3000;

// Route to fetch and convert the image
app.get('/', async (request, response) => {
  const worker = await createWorker('eng', 1, {
    cachePath: '/lang',
  });

  const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
  console.log('Processed:', text);
  await worker.terminate();

  response.send(text)
});

app.post('/upload', async (request, response) => {
  if (!request.files || Object.keys(request.files).length === 0) {
    return response.status(400).send('No files were uploaded.');
  }

  let langChoice = request.body.lang ? request.body.lang : 'eng'

  const worker = await createWorker([`${langChoice}`]);

  const gotImage = request.files.image
  console.log('Image:', gotImage)

  const { data: { text } } = await worker.recognize(gotImage.data);
  console.log('Processed:', text);
  await worker.terminate();

  response.send(text)
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});