import axios from 'axios'

export default axios.create({
  baseURL: 'https://api-osmosis.imperator.co/',
  headers: {
    'Content-type': 'application/json'
  }
})
