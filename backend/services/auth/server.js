require('dotenv').config({ path: '../../.env' });
const express = require('express');
const cors = require('cors');
const { sequelize, connectDB } = require('../../shared/config/db');
const authRoutes = require('./src/routes/authRoutes');
require('./src/models/User');
require('./src/models/RefreshToken');

const app = express();
app.use(cors());
app.use(express.json());

const start = async () => {
  await connectDB();
  await sequelize.sync({ alter: true });
  console.log('✅ Tables synced');
};
start();

app.use('/api/auth', authRoutes);

const PORT = process.env.AUTH_PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Auth service running on port ${PORT}`));