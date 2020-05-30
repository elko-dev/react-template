export const environment = {
  //apiBase: 'https://elko-trail-addict-server-dev.herokuapp.com',
  apiBase: process.env.REACT_APP_API_BASE_PATH || 'http://localhost:4000',
};
