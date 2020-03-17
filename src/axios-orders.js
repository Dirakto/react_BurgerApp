import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-my-burger-c12fd.firebaseio.com/',
})

export default instance;