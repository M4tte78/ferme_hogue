module.exports = (sequelize, DataTypes) => {
  const Traitement = sequelize.define('Traitement', {
    id_traitement: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    type: { type: DataTypes.STRING, allowNull: false },
    date_prevue: { type: DataTypes.DATE, allowNull: false },
    date_effectuee: { type: DataTypes.DATE },
    commentaire: { type: DataTypes.TEXT },
    cheval_id: { type: DataTypes.INTEGER },
    personnel_id: { type: DataTypes.INTEGER },
    medicament_id: { type: DataTypes.INTEGER }
  }, {});
  Traitement.associate = function(models) {
    Traitement.belongsTo(models.Cheval, { foreignKey: 'cheval_id' });
    Traitement.belongsTo(models.Personnel, { foreignKey: 'personnel_id' });
    Traitement.belongsTo(models.Medicament, { foreignKey: 'medicament_id' });
  };
  return Traitement;
};