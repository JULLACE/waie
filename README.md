# what
**Do you seriously know what Glucuronolactone is? (I did not make this ingredient up)**

What Are You Eating (WAYE) is a resource for those who:
  - Are highly sensitive to certain ingredients
  - Travelers who require quick translation of foreign food products' ingredients
  - Or those who are generally cautious or curious of what they eat everyday

WAYE utilizes [OCR](https://en.wikipedia.org/wiki/Optical_character_recognition) to parse labels and combines this with the knowledge of [large language models](https://en.wikipedia.org/wiki/Large_language_model) in order to provide information about the ingredients that make up food products. Alongside an easy-to-understand UI, anyone can pick up their phone, snap a picture, and be a little smarter about the snacks they eat everyday.

# why
Processed foods are an inevitable part of modern life, and we believe that everyone should have accurate information regarding the foods that they eat. For those with allergies, scanning ingredients labels can be frustrating. 

Our tool makes the process of determining these potential allergens simple with multiple language support so cautious users can sigh a breath of relief even on vacation. We hope WAYE helps people feel even a little bit more curious about what truly goes into their food products and become more mindful of their health.


# dev
Technologies include: React Native / Expo, Express.js, Tesseract.js (OCR), as well as OpenAI's API.

To build or contribute, go into either `frontend` or `backend` directories and run these commands accordingly.

`frontend`
```bash
npm install
expo start app
```
`backend`
```bash
npm install
node run dev
```

(Note: be aware our project requires certain secrets using .env files) 




