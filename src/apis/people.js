import axiosClient from './axiosClient';

const peopleApi = {
  get: (page) => {
    const url = `/people/?page=${page}`;
    return axiosClient.get(url);
  }
};

export default peopleApi;