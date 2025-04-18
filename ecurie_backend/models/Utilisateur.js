module.exports = (sequelize, DataTypes) => {
  const Utilisateur = sequelize.define('Utilisateur', {
    id_user: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    mot_de_passe: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telephone: {
      type: DataTypes.STRING
    },
    adresse: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'Utilisateurs'
  });

  Utilisateur.associate = (models) => {
    Utilisateur.belongsToMany(models.Role, {
      through: 'UtilisateurRoles',
      foreignKey: 'id_user',
      otherKey: 'role_id',
      as: 'roles' // important pour les requêtes inclusives
    });

    Utilisateur.hasMany(models.Cheval, { foreignKey: 'proprietaire_id' });
    Utilisateur.hasMany(models.Loyer, { foreignKey: 'proprietaire_id' });
    Utilisateur.hasMany(models.Notification, { foreignKey: 'user_id' });
  };

  return Utilisateur;
};
