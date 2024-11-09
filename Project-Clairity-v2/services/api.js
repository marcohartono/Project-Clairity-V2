import axios from 'axios'

const instanceAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
  },
})

const endpoints = {
  getDevices(params) {
    return instanceAxios.get('/devices', { params })
  },
  getUplinks(params) {
    return instanceAxios.get('/uplinks', { params })
  },
  getFields(fieldId, params = {}) {
    // Ensure the fieldId is passed as a path variable and params are passed correctly.
    return instanceAxios.get(`/fields/${fieldId}/devices`, { params });
  },
  getFieldDetail(fieldId, params = {}) {
    // Ensure the fieldId is passed as a path variable and params are passed correctly.
    return instanceAxios.get(`/fields/${fieldId}`, { params });
  }
}

export default endpoints