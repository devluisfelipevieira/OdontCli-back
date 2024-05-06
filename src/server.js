const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const routes = require("./routes");
const sequelize = require("../seeders/index");
// const cors = require("cors");

require("./config/associations");

const app = express();

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Substitua pelo seu domínio de frontend
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

app.use(express.json()); // para ler os arquivos JSON
app.use(routes); //para usar arquivo "routes"
// app.use(cors()); // possibilita que requisições externas recebam informações dessa
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  sequelize.authenticate().then(() => {
    console.log("DB connection successfull");
  });
  console.log(`Server started successfuly at port ${PORT}`);
}); //porta padrão
