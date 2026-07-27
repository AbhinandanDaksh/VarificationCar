exports.health = (req, res) => {
  res.json({ service: 'vehicles', status: 'ok' });
};
