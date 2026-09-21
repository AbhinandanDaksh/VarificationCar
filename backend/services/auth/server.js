const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const express = require('express');
const cors = require('cors');
const { connectDB } = require('../../shared/config/db');
const authRoutes = require('./src/routes/authRoutes');
require('./src/models/User');
require('./src/models/RefreshToken');

const app = express();
app.use(cors());
app.use(express.json());

const start = async () => {
  await connectDB();
};
start();

app.use('/api/auth', authRoutes);

const PORT = process.env.AUTH_PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Auth service running on port ${PORT}`));