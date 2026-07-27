require('dotenv').config({ path: '../../.env' });
const express = require('express');
const cors = require('cors');
const { connectDB } = require('../../shared/config/db');
const paymentRoutes = require('./src/routes/paymentRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const start = async () => {
  await connectDB();
};
start();

app.use('/api/payments', paymentRoutes);

const PORT = process.env.PAYMENT_PORT || 5004;
app.listen(PORT, () => console.log(`🚀 Payment service running on port ${PORT}`));
