module.exports = (sequelize, DataTypes) => {
  const Depense = sequelize.define('Depense', {
    id_depense: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    type: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    montant: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    date_depense: { type: DataTypes.DATE, allowNull: false }
  }, {});
  return Depense;
};