/**
 *Function used to store a value in a session storage 
 * @param {string} key -  The key to store value with .Used to retrieve value
 * @param {string} value - The value to be stored  
 */

export const storeValueSessionStorage = (key, value) => {
    try {
        sessionStorage.setItem(key, value)
    } catch (QuotaExceededError) {
        console.log(QuotaExceededError)
    }
}

/**
 * Function used to retrieve values in a sessions storage
 * @param {string} key - The key of value to retrieve
 * @returns {string} session item
 */

export const retrieveValueSessionStorage = (key) => {
    return sessionStorage.getItem(key)
}

/**
 * function used to remove value in a session storage
 * @param {string} key - The key to delete 
 */

export const removeValueSessionStorage = (key) => {
    sessionStorage.removeItem(key)
}
