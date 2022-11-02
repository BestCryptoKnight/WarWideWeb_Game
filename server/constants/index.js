const ORIGIN = '*'
const BASECLIENTURL = "http://localhost"
const PORT = process.env.PORT || 443
const ETHERPRICE = 1500;
const PRICE1 = 0.50
const PRICE2 = 1
const PRICE3 = 3
const FEE = 3
const EMAIL_API_KEY = "7ffdce70d6830ca57c0ef2cfefe42cab"
const EMAIL_SECRET_KEY = "fe09887e5fbe004df84606570fea4747"

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
  EMAIL_API_KEY,
  EMAIL_SECRET_KEY
}
