const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const express = require('express');
const cors = require('cors');
const { connectDB } = require('../../shared/config/db');
const notificationRoutes = require('./src/routes/notificationRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const start = async () => {
  await connectDB();
};
start();

app.use('/api/notifications', notificationRoutes);

const PORT = process.env.NOTIFICATION_PORT || 5005;
app.listen(PORT, () => console.log(`🚀 Notification service running on port ${PORT}`));
