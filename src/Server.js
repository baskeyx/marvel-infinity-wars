const Server = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8000/api'
  : 'https://vsec9h4b21.execute-api.eu-west-2.amazonaws.com/api';

export default Server;