module.exports = (sequelize, DataTypes) => {
  const Personnel = sequelize.define('Personnel', {
    id_personnel: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nom: { type: DataTypes.STRING, allowNull: false },
    poste: { type: DataTypes.STRING },
    disponible: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, {});
  Personnel.associate = function(models) {
    Personnel.hasMany(models.Traitement, { foreignKey: 'personnel_id' });
  };
  return Personnel;
};