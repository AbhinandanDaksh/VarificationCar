exports.health = (req, res) => {
  res.json({ service: 'payments', status: 'ok' });
};
