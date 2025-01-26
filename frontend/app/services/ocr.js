import axios from 'axios'
const baseUrl = 'http://10.136.178.238:3003/api/tes'

const getTest = () => {
    const request = axios.get(baseUrl)
    
    return request.then(response => response.data)
}

const send = (image) => {
    console.log('in service', image)
    let data = new FormData()
    data.append('image', {
        uri: `${image.uri}`,
        type: `${image.mimeType}`,
        name: `${image.fileName}`
    })

    const request = axios.post(`${baseUrl}/upload`, data, {
        headers: {
          'accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        }
    })
    
    return request.then(res => res.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(res => res.data)
}

export default {
    getTest,
    send
}