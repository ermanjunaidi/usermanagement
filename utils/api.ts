import axios from 'axios'

export const dummy = axios.create({
    baseURL: 'https://dummyjson.com'
})

export const abstract = axios.create({
    baseURL: 'https://emailvalidation.abstractapi.com/v1'
})
