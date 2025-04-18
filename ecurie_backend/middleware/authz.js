exports.isAdmin = (req, res, next) => {
  if (!req.user.roles.includes('admin')) {
    return res.status(403).json({ error: 'Accès interdit - admin uniquement' });
  }
  next();
};

exports.isProprietaire = (req, res, next) => {
  if (!req.user.roles.includes('proprietaire')) {
    return res.status(403).json({ error: 'Accès interdit - propriétaire uniquement' });
  }
  next();
};
