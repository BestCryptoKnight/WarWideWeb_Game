// api url (where your server is hosted at)
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080'
const GAME_ADDRESS = '0x02AAC4407e220Ef6B9289521BC85676aC61Dbc77';
const HEADER = {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
}

export {
  BACKEND_URL,
  GAME_ADDRESS,
  HEADER,
}
