import axios from 'axios';

let endpoint = process.env.REACT_APP_ENDPOINT;
console.log(process.env)

export const getBooks = () => {
    return axios.get(`${endpoint}/books`)
}

export const getMyBooks = () => {
    return axios.get(`${endpoint}/books/my`)
}

export const getFav = () => {
    return axios.get(`${endpoint}/books/favourites`)
}

export const addBook = (book) => {
    console.log(book)
    return axios.put(`${endpoint}/books/my`, {
        params: {
            id: book.id,
            aggiunto: 'true'
        }
    })
}

export const removeBook = (book) => {
    console.log(book);
    return axios.put(`${endpoint}/books/my`, {
        params: {
            id: book.id,
            aggiunto: 'false'
        }
    })
}


export const addFav = (book) => {
    return axios.post(`${endpoint}/books/favourites`, {
        params: {
            idBook: book.id,
            title: book.title,
            description: book.description,
            imageUrl: book.imageUrl,
            generi: book.generi,
            stato: book.stato
        }
    })
}

export const deleteFav = (book) => {
    return axios.delete(`${endpoint}/books/favourites`, {
        params: {
            idBook: book.id
        }
    })
}