const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tokenHash: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    revokedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

refreshTokenSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

refreshTokenSchema.set('toJSON', {
  virtuals: true,
});

refreshTokenSchema.set('toObject', {
  virtuals: true,
});

const RefreshToken = mongoose.models.RefreshToken || mongoose.model('RefreshToken', refreshTokenSchema);

module.exports = RefreshToken;
