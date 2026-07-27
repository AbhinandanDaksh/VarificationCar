require('dotenv').config({ path: '../../.env' });
const express = require('express');
const cors = require('cors');
const { connectDB } = require('../../shared/config/db');
const inspectionRoutes = require('./src/routes/inspectionRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const start = async () => {
  await connectDB();
};
start();

app.use('/api/inspections', inspectionRoutes);

const PORT = process.env.INSPECTION_PORT || 5003;
app.listen(PORT, () => console.log(`🚀 Inspection service running on port ${PORT}`));
