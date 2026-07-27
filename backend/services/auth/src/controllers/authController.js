const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { Op } = require('sequelize');
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  hashToken,
} = require('../../../../shared/utils/tokens');
const { sendMail, templates } = require('../../../../shared/mail');

const refreshExpiryMs = () => {
  const value = process.env.JWT_REFRESH_EXPIRES || '7d';
  const match = /^(\d+)([smhd])$/.exec(value);
  if (!match) return 7 * 24 * 60 * 60 * 1000;

  const amount = Number(match[1]);
  const unit = match[2];
  const multipliers = { s: 1000, m: 60_000, h: 3_600_000, d: 86_400_000 };
  return amount * multipliers[unit];
};

const createRawToken = () => crypto.randomBytes(32).toString('hex');

const issueTokens = async (user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await RefreshToken.create({
    userId: user.id,
    tokenHash: hashToken(refreshToken),
    expiresAt: new Date(Date.now() + refreshExpiryMs()),
  });

  return { accessToken, refreshToken };
};

const revokeAllRefreshTokens = async (userId) => {
  await RefreshToken.update(
    { revokedAt: new Date() },
    { where: { userId, revokedAt: null } }
  );
};

const publicUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  isEmailVerified: user.isEmailVerified,
});

const safeSendMail = async (payload) => {
  try {
    await sendMail(payload);
  } catch (err) {
    console.error('Mail send failed:', err.message);
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email and password are required' });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const verifyToken = createRawToken();
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      emailVerifyToken: hashToken(verifyToken),
      emailVerifyExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    const tokens = await issueTokens(user);

    const verifyMail = templates.verifyEmailTemplate({ name: user.name, token: verifyToken });
    await safeSendMail({ to: user.email, ...verifyMail });

    const welcomeMail = templates.welcomeEmail({ name: user.name });
    await safeSendMail({ to: user.email, ...welcomeMail });

    res.status(201).json({
      message: 'User registered. Please verify your email.',
      user: publicUser(user),
      ...tokens,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const tokens = await issueTokens(user);

    res.json({
      user: publicUser(user),
      ...tokens,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: 'refreshToken is required' });
    }

    let decoded;
    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch {
      return res.status(401).json({ message: 'Invalid or expired refresh token' });
    }

    const stored = await RefreshToken.findOne({
      where: { tokenHash: hashToken(refreshToken), userId: decoded.id },
    });

    if (!stored || stored.revokedAt || stored.expiresAt < new Date()) {
      return res.status(401).json({ message: 'Refresh token revoked or expired' });
    }

    stored.revokedAt = new Date();
    await stored.save();

    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(401).json({ message: 'User not found' });

    const tokens = await issueTokens(user);
    res.json(tokens);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: 'refreshToken is required' });
    }

    const stored = await RefreshToken.findOne({
      where: { tokenHash: hashToken(refreshToken) },
    });

    if (stored && !stored.revokedAt) {
      stored.revokedAt = new Date();
      await stored.save();
    }

    res.json({ message: 'Logged out' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email', 'role', 'isEmailVerified', 'createdAt'],
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'currentPassword and newPassword are required' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'newPassword must be at least 6 characters' });
    }

    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    await revokeAllRefreshTokens(user.id);

    res.json({ message: 'Password changed successfully. Please login again.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'email is required' });

    const user = await User.findOne({ where: { email } });

    // same response whether user exists or not
    if (user) {
      const resetToken = createRawToken();
      user.resetPasswordToken = hashToken(resetToken);
      user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);
      await user.save();

      const mail = templates.resetPasswordTemplate({ name: user.name, token: resetToken });
      await safeSendMail({ to: user.email, ...mail });
    }

    res.json({ message: 'If that email exists, a reset token has been sent' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ message: 'token and newPassword are required' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'newPassword must be at least 6 characters' });
    }

    const user = await User.findOne({
      where: {
        resetPasswordToken: hashToken(token),
        resetPasswordExpires: { [Op.gt]: new Date() },
      },
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired reset token' });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();
    await revokeAllRefreshTokens(user.id);

    res.json({ message: 'Password reset successful. Please login.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: 'token is required' });

    const user = await User.findOne({
      where: {
        emailVerifyToken: hashToken(token),
        emailVerifyExpires: { [Op.gt]: new Date() },
      },
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired verify token' });

    user.isEmailVerified = true;
    user.emailVerifyToken = null;
    user.emailVerifyExpires = null;
    await user.save();

    res.json({ message: 'Email verified successfully', user: publicUser(user) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
