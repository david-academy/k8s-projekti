import axios from 'axios'
//const baseUrl = process.env.REACT_APP_API //|| `${process.env.APP}/api/login`
//const baseUrl = 'http://localhost:3001/api/login'
const baseUrl = 'api/api/login/'
console.log(baseUrl)

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  console.log(response.data)
  return response.data
}

export default { login }