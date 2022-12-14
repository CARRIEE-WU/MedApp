import _axios from 'axios'

const axios = (baseURL) => {
    const instance = _axios.create({
        baseURL: baseURL || 'http://140.136.151.66:8000/api/v1',
        timeout: 1000
    });

    return instance;
}

export {axios}
export default axios();
