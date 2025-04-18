module.exports = (sequelize, DataTypes) => {
  const Loyer = sequelize.define('Loyer', {
    id_loyer: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    proprietaire_id: { type: DataTypes.INTEGER },
    mois: { type: DataTypes.TINYINT, allowNull: false },
    annee: { type: DataTypes.SMALLINT, allowNull: false },
    montant: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    statut_paiement: { type: DataTypes.ENUM('payé', 'en attente'), defaultValue: 'en attente' },
    date_paiement: { type: DataTypes.DATE }
  }, {});
  Loyer.associate = function(models) {
    Loyer.belongsTo(models.Utilisateur, { foreignKey: 'proprietaire_id' });
  };
  return Loyer;
};