import axios from 'axios'
const baseUrl = '/api/tes'

const getTest = () => {
    const request = axios.get(baseUrl)
       .catch((error) => console.log('uh oh!', error.message))

    
    return request.then(response => response.data)
}

const sendImage = (image, lang) => {
    console.log('in service', image, lang)
    let data = new FormData()
    data.append('image', {
        uri: `${image.uri}`,
        type: `${image.mimeType ? image.mimeType : 'image/jpeg'}`,
        name: `${image.fileName ? image.fileName : 'test'}`
    })
    
    const langCode = lang ? lang : 'eng'
    data.append('lang', langCode)

    const request = axios.post(`${baseUrl}/upload`, data, {
        headers: {
          'accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        }
    })
    .catch((error) => console.log('uh oh!', error.message))

    
    return request.then(res => res.data)
}

const sendOneIngredient = (ingredient) => {
    const request = axios.post(`${baseUrl}/explain`, {word: ingredient})
        .catch((error) => console.log('uh oh!', error.message))

    return request.then(res => res.data)
}

export default {
    getTest,
    sendImage,
    sendOneIngredient
}