exports.health = (req, res) => {
  res.json({ service: 'notifications', status: 'ok' });
};
