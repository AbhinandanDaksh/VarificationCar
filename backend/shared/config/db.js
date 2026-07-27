const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false, // true kar sakte ho debugging ke liye
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connected');
  } catch (err) {
    console.error('❌ MySQL connection error:', err.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };