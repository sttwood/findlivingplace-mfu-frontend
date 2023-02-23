import axios from 'axios'

const REACT_APP_API = 'https://findlivingplace-mfu-backend.vercel.app/api'

// POST
export const createPlace = async (authtoken, value) => {
    return await axios.post(REACT_APP_API + '/place', value, {
        headers: {
            authtoken,
        },
    })
}

// GET [All]
export const listPlace = async (count) =>
    await axios.get(REACT_APP_API + '/place/' + count)

// GET [DESC]
export const listPlaceBy = async (sort, order, limit) =>
    await axios.post(REACT_APP_API + '/placeby', {
        sort,
        order,
        limit
    })

// GET [One]
export const readPlace = async (id) =>
    await axios.get(REACT_APP_API + '/places/' + id)

// DELETE
export const removePlace = async (authtoken, id) =>
    await axios.delete(REACT_APP_API + '/place/' + id,
        {
            headers: {
                authtoken,

            }
        })

// PUT
export const updatePlace = async (authtoken, id, place) =>
    await axios.put(REACT_APP_API + '/place/' + id, place,
        {
            headers: {
                authtoken,

            }
        })

// POST [Filter]
export const searchFilters = async (arg) =>
    await axios.post(REACT_APP_API + '/search/filters', arg)

