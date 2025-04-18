const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: false, // désactiver les logs SQL (optionnel)
  }
);

// Charger tous les modèles Sequelize présents dans le dossier
fs.readdirSync(__dirname)
  .filter(file =>
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js'
  )
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Appliquer les associations définies dans les modèles
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Associations manuelles pour les rôles multiples
if (db.Utilisateur && db.Role) {
  db.Utilisateur.belongsToMany(db.Role, {
    through: db.UtilisateurRoles,
    foreignKey: 'id_user',
    otherKey: 'role_id'
  });

  db.Role.belongsToMany(db.Utilisateur, {
    through: db.UtilisateurRoles,
    foreignKey: 'role_id',
    otherKey: 'id_user'
  });
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
