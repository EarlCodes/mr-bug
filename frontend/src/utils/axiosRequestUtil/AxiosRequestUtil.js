import axios from "axios"

/**
 * Arrow function used to perform post request to server with token authentication using axios .
 * @param {string} url -The url to post data to.
 * @param {string} token - Token string used for authentication. 
 * @param {object} data  - The data to post.
 * @returns  {axios.response} - Returns a axios response object.
 */
export const axiosPost = async (url, token, data) => {
    const response = await axios.post(url, data, {
        headers: {
            "Authorization": token
        }
    })
    return response;
}

/**
 * Arrow function used to perform get request to server with token authentication using axios.
 * @param {string} url -The url to get data from.
 * @param {string} token -Token string used for authentication.
 * @returns {axios.response} - Axios response object.
 */

export const axiosGet = async (url, token) => {
    const response = await axios.get(url, {
        headers: {
            "Authorization": token
        }
    })
    return response;
}

/**
 * Arrow function used to perform update request to server with token authentication.
 * @param {string} url -The url to update data.
 * @param {string} token -Token string used for authentication. 
 * @param {object} data - Update data. 
 * @returns {axios.response} - axios response.
 */
export const axiosUpdate = async (url, token, data) => {
    const response = await axios.patch(url, data, {
        headers: {
            "Authorization": token
        }
    })
    return response;
}

/**
 * Arrow function used to perform delete operations to servers that uses token authentication.uses axios to make request.
 * @param {string} url -The url to delete.
 * @param {string} token -Token string used for authentication. 
 * @returns {axios.response} - axios response.
 */
export const axiosDelete = async (url, token) => {
    const response = await axios.delete(url, {
        headers: {
            "Authorization": token
        }
    })
    return response;
}