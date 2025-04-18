module.exports = (sequelize, DataTypes) => {
  const Medicament = sequelize.define('Medicament', {
    id_medicament: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nom: { type: DataTypes.STRING, allowNull: false },
    quantite_stock: { type: DataTypes.INTEGER, defaultValue: 0 },
    seuil_alerte: { type: DataTypes.INTEGER, defaultValue: 5 },
    date_peremption: { type: DataTypes.DATE }
  }, {});
  Medicament.associate = function(models) {
    Medicament.hasMany(models.Traitement, { foreignKey: 'medicament_id' });
  };
  return Medicament;
};