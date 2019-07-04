import axios from 'axios';

let endpoint = process.env.REACT_APP_ENDPOINT;
console.log(process.env)

export const getBooks = () => {
    return axios.get(`${endpoint}/books`)
}

export const getMyBooks = () => {
    return axios.get(`${endpoint}/books/my`)
}

export const addBook = (book) => {
    console.log(book)
    return axios.put(`${endpoint}/books/my`, {
        params: {
            id: book.id,
            aggiunto: book.aggiunto ? 0 : 1
        }
    })
}