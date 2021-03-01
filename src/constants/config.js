const dev = {
  API_URL: 'https://swapi.dev/api/'
};

const prod = {
  API_URL: 'https://swapi.dev/api/'
};

// eslint-disable-next-line no-undef
const config = process.env.NODE_ENV === 'development' ? dev : prod;

export default config;