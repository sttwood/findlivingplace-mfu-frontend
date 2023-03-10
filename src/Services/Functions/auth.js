import axios from 'axios'

const REACT_APP_API = 'https://findlivingplace-mfu-backend.vercel.app/api'

// POST [Register]
export const register = async (value) =>
    await axios.post(REACT_APP_API + '/register', value)

// POST [Login]
export const login = async (value) =>
    await axios.post(REACT_APP_API + '/login', value)

// POST [Current User]
export const currentUser = async (authtoken) => {
    return await axios.post(REACT_APP_API + "/current-user",
        {},
        {
            headers: {
                authtoken,
            },
        }
    );
}
// POST [Current Admin]
export const currentAdmin = async (authtoken) => {
    return await axios.post(REACT_APP_API + "/current-admin",
        {},
        {
            headers: {
                authtoken,
            },
        }
    );
}
