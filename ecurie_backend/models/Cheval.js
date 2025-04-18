module.exports = (sequelize, DataTypes) => {
  const Cheval = sequelize.define('Cheval', {
    id_cheval: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nom: { type: DataTypes.STRING, allowNull: false },
    race: { type: DataTypes.STRING },
    date_naissance: { type: DataTypes.DATE },
    proprietaire_id: { type: DataTypes.INTEGER }
  }, {
    tableName: 'Chevaux'  // <- c'est ici qu'on fixe le nom réel de la table
  });

  Cheval.associate = function(models) {
    Cheval.belongsTo(models.Utilisateur, { foreignKey: 'proprietaire_id' });
    Cheval.hasMany(models.Traitement, { foreignKey: 'cheval_id' });
  };

  return Cheval;
};
