import "dotenv/config";

const DB_URL = process.env.DB_URL;
const SECRET = process.env.SECRET;
const PORT = process.env.PORT || 3000;

export { DB_URL, SECRET, PORT };
