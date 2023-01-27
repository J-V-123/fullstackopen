import axios from "axios";
const url = 'http://localhost:3001/persons'

const getData = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const postData = (newData) => {
    const request = axios.post(url, newData)
    return request.then(response => response.data)
}

const deleteData = (id) => {
    const request = axios.delete(`${url}/${id}`)
    return request.then(response => response)
    
}

const functions = {
    getData,
    postData,
    deleteData
}

export default functions

