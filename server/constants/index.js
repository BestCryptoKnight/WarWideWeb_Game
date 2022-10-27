const ORIGIN = '*'
const BASECLIENTURL = "http://localhost"
const PORT = process.env.PORT || 8080
const ETHERPRICE = 1500;
const PRICE1 = 1
const PRICE2 = 2
const PRICE3 = 3
const FEE = 3

// for "atlas" edit MONGO_URI in -> .env file || for "community server" edit <MyDatabase>
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/MyDatabase'
const MONGO_OPTIONS = {}

const JWT_SECRET = process.env.JWT_SECRET || 'warwideweb'

module.exports = {
  ORIGIN,
  BASECLIENTURL,
  PORT,
  MONGO_URI,
  MONGO_OPTIONS,
  JWT_SECRET,
  PRICE1,
  PRICE2,
  PRICE3,
  FEE,
  ETHERPRICE,
}
