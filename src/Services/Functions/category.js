import axios from 'axios'

const REACT_APP_API = 'https://findlivingplace-mfu-backend.vercel.app/api'

export const createCategory = async (authtoken, value) => {
    return await axios.post(REACT_APP_API + '/category', value, {
        headers: {
            authtoken,
        },
    })
}

export const listCategory = async (authtoken) =>
    await axios.get(REACT_APP_API + '/category', {
        headers: {
            authtoken
        }
    })

export const deleteCategory = async (authtoken, id) =>
    await axios.delete(REACT_APP_API + '/category/' + id, {
        headers: {
            authtoken
        }
    })

export const ReadCategory = async (authtoken, id) =>
    await axios.get(REACT_APP_API + '/category/' + id, {
        headers: {
            authtoken
        }
    })

export const EditCategory = async (authtoken, id, value) =>
    await axios.put(REACT_APP_API + '/category/' + id, value, {
        headers: {
            authtoken
        }
    })