import axios from 'axios'
const baseUrl = '/red-days-calendar/api/users'

const create = async ({username, password}) => {
    const response = await axios.post(baseUrl, {username, password})
    return response.data
}

export default { create }