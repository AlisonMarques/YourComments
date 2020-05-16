const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());

//converte json em formato entendível para o js
app.use(express.json());
app.use(routes);

app.listen(3333);
