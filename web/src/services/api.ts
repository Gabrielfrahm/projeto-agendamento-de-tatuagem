import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:3333',
  baseURL: 'https://agendamento-tattoo.herokuapp.com',
});

export default api;
