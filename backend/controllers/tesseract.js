const tesRouter = require('express').Router()
const { createWorker } = require('tesseract.js');

tesRouter.get('/', async (request, response) => {
  const worker = await createWorker('eng', 1, {
    cachePath: './lang',
  });

  const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
  console.log('Processed:', text);
  await worker.terminate();

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

  const gotImage = request.files.image

  const { data: { text } } = await worker.recognize(gotImage.data);
  console.log('Processed:', text);
  await worker.terminate();

  response.send(text)
})

module.exports = tesRouter