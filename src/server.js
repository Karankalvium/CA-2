const express = require('express');
const mongoose = require('mongoose');
const RestaruantRouters = require('../src/controllers/restaurant.controllers.js');
const ItemsRouters = require('../src/controllers/items.controllers.js')

const app = express();
const PORT = 8900;

app.use(express.json());
app.use('/restaruant', RestaruantRouters);
app.use('/items', ItemsRouters);



mongoose
.connect("mongodb+srv://mkarandeep1208:MUp3bpLJB2vCLGDA@cluster0.zz9yl.mongodb.net/BackendCA")

.then(() => {
  app.listen(PORT, () => console.log(`Server running on port  http://localhost:${PORT}`));
})

.catch((error) => console.error('MongoDB connection error:', error));


