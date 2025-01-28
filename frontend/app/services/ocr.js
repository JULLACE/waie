import axios from 'axios'
const baseUrl = '/api/tes'


const dataURItoBlob = (dataURI) => {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}


const getTest = () => {
    const request = axios.get(baseUrl)
       .catch((error) => console.log('uh oh!', error.message))

    
    return request.then(response => response.data)
}

const sendImage = (image, lang) => {
    // Fix for uploading base64s instead of File Blobs
    let dataBlob = null
    if (image.uri.includes('base64'))
        dataBlob = dataURItoBlob(image.uri)

    let data = new FormData()
    if (dataBlob)
        data.append('image', dataBlob, 'image')
    else
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