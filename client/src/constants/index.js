// api url (where your server is hosted at)
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://192.168.116.216:8080'
const GAME_ADDRESS = '0x02AAC4407e220Ef6B9289521BC85676aC61Dbc77';
const HEADER = {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
}
const PRICE1 = 1
const PRICE2 = 2
const PRICE3 = 3

export {
  BACKEND_URL,
  GAME_ADDRESS,
  HEADER,
  PRICE1,
  PRICE2,
  PRICE3
}
