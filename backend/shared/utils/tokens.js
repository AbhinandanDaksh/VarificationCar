const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const ACCESS_SECRET = () => process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;
const REFRESH_SECRET = () => process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
const ACCESS_EXPIRES = () => process.env.JWT_ACCESS_EXPIRES || '15m';
const REFRESH_EXPIRES = () => process.env.JWT_REFRESH_EXPIRES || '7d';

const generateAccessToken = (user) =>
  jwt.sign(
    { id: user.id, role: user.role, type: 'access' },
    ACCESS_SECRET(),
    { expiresIn: ACCESS_EXPIRES() }
  );

const generateRefreshToken = (user) =>
  jwt.sign(
    { id: user.id, role: user.role, type: 'refresh' },
    REFRESH_SECRET(),
    { expiresIn: REFRESH_EXPIRES() }
  );

const verifyAccessToken = (token) => {
  const decoded = jwt.verify(token, ACCESS_SECRET());
  if (decoded.type !== 'access') throw new Error('Invalid token type');
  return decoded;
};

const verifyRefreshToken = (token) => {
  const decoded = jwt.verify(token, REFRESH_SECRET());
  if (decoded.type !== 'refresh') throw new Error('Invalid token type');
  return decoded;
};

const hashToken = (token) =>
  crypto.createHash('sha256').update(token).digest('hex');

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  hashToken,
};
