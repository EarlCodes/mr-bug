import dayjs from "dayjs"

export const CheckTokenExpired = (tokenExpiryDate) => {
    let isTokenExpired = true
    if (dayjs().isBefore(tokenExpiryDate)) {
        isTokenExpired = false
    }
    return isTokenExpired;
}
