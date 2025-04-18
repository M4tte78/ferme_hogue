module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    id_notification: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    contenu: { type: DataTypes.TEXT, allowNull: false },
    date_envoi: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    user_id: { type: DataTypes.INTEGER },
    lu: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {});
  Notification.associate = function(models) {
    Notification.belongsTo(models.Utilisateur, { foreignKey: 'user_id' });
  };
  return Notification;
};