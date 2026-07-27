exports.health = (req, res) => {
  res.json({ service: 'inspections', status: 'ok' });
};
