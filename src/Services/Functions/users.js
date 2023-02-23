import axios from 'axios'

const REACT_APP_API = 'https://findlivingplace-mfu-backend.vercel.app/api'

// GET [User List]
export const userList = async (authtoken) => {
    return await axios.get(REACT_APP_API + '/users', {
        headers: {
            authtoken,
        },
    })
}
// GET [One]
export const userRead = async (id) =>
    await axios.get(REACT_APP_API + '/users/' + id)

// POST [Change Status]
export const changeStatus = async (authtoken, value) => {
    return await axios.post(REACT_APP_API + '/change-status', value, {
        headers: {
            authtoken,
        },
    })
}
// POST [Change Role]
export const changeRole = async (authtoken, value) => {
    return await axios.post(REACT_APP_API + '/change-role', value,
        {
            headers: {
                authtoken,
            },
        })
}

// DELETE
export const deleteUser = async (authtoken, id) => {
    return await axios.delete(REACT_APP_API + '/users/' + id,
        {
            headers: {
                authtoken,
            },
        })
}

// PUT [Password]
export const changePassword = async (authtoken, id, Passwordvalues) => {
    return await axios.put(REACT_APP_API + '/users/edit-password/' + id, Passwordvalues,
        {
            headers: {
                authtoken,
            },
        })
}
// PUT [Edit Profile]
// First Name
export const changeFirstname = async (authtoken, id, FirstNamevalues) =>
    await axios.put(REACT_APP_API + '/users/edit-firstname/' + id, FirstNamevalues,
        {
            headers: {
                authtoken,
            }
        })
// Last Name
export const changeLastname = async (authtoken, id, LastNamevalues) =>
    await axios.put(REACT_APP_API + '/users/edit-lastname/' + id, LastNamevalues,
        {
            headers: {
                authtoken,
            }
        })
// Phone Number
export const changeTelephone = async (authtoken, id, Telephonevalues) =>
    await axios.put(REACT_APP_API + '/users/edit-telephone/' + id, Telephonevalues,
        {
            headers: {
                authtoken,
            }
        })

// GET [favorite]
export const getFavorite = async (authtoken) =>
    await axios.get(REACT_APP_API + '/user/favorite',
        {
            headers: {
                authtoken,
            }
        })
export const addToFavorite = async (authtoken, placeId) =>
    await axios.post(REACT_APP_API + '/user/favorite', { placeId },
        {
            headers: {
                authtoken,
            }
        })
export const removeFavorite = async (authtoken, placeId) =>
    await axios.put(REACT_APP_API + '/user/favorite/' + placeId, {},
        {
            headers: {
                authtoken,
            }
        })