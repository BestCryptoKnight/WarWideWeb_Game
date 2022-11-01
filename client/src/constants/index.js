// api url (where your server is hosted at)
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost'
const GAME_ADDRESS = '0xf1d82e397A4A5b820712f9116E892D0455692ea3';
const FEE = 3;

const HEADER = () => (
  {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })

const PRICE1 = 0.5
const PRICE2 = 1
const PRICE3 = 3

export {
  BACKEND_URL,
  GAME_ADDRESS,
  HEADER,
  PRICE1,
  PRICE2,
  PRICE3,
  FEE
}
