require('dotenv').config({ path: '../../.env' });
const express = require('express');
const cors = require('cors');
const { connectDB } = require('../../shared/config/db');
const vehicleRoutes = require('./src/routes/vehicleRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const start = async () => {
  await connectDB();
};
start();

app.use('/api/vehicles', vehicleRoutes);

const PORT = process.env.VEHICLE_PORT || 5002;
app.listen(PORT, () => console.log(`🚀 Vehicle service running on port ${PORT}`));
