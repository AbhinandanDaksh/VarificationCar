require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());

app.use('/api/auth', createProxyMiddleware({
  target: `http://localhost:${process.env.AUTH_PORT || 5001}`,
  changeOrigin: true,
}));


app.use('/api/vehicles', createProxyMiddleware({
  target: `http://localhost:${process.env.VEHICLE_PORT || 5002}`,
  changeOrigin: true,
}));

app.use('/api/inspections', createProxyMiddleware({
  target: `http://localhost:${process.env.INSPECTION_PORT || 5003}`,
  changeOrigin: true,
}));

app.use('/api/payments', createProxyMiddleware({
  target: `http://localhost:${process.env.PAYMENT_PORT || 5004}`,
  changeOrigin: true,
}));

app.use('/api/notifications', createProxyMiddleware({
  target: `http://localhost:${process.env.NOTIFICATION_PORT || 5005}`,
  changeOrigin: true,
}));

const PORT = process.env.GATEWAY_PORT || 8080;
app.listen(PORT, () => console.log(`🚪 API Gateway running on port ${PORT}`));
