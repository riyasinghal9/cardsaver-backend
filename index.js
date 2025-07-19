
require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./config/database');
const offerRoutes = require('./routes/offer');
const discountRoutes = require('./routes/discount');

app.use(express.json());

app.use('/offer', offerRoutes);
app.use('/highest-discount', discountRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log('Database connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('DB Error:', err));
