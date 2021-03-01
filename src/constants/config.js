const dev = {
  API_URL: 'http://swapi.dev/api/'
}

const prod = {}

const config = process.env.NODE_ENV === 'development' ? dev : prod

export default config