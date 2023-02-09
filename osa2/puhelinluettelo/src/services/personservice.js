import axios from "axios";
const url = '/api/persons'

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

const updateNumber = (id, newData) => {
    const request = axios.put(`${url}/${id}`, newData)
    return request.then(response => response.data)
}

const functions = {
    getData,
    postData,
    deleteData,
    updateNumber
}

export default functions

