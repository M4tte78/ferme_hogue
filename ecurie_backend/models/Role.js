module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
      role_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    }, {
      tableName: 'Roles'
    });
  
    Role.associate = (models) => {
      Role.belongsToMany(models.Utilisateur, {
        through: 'UtilisateurRoles',
        foreignKey: 'role_id',
        otherKey: 'id_user',
        as: 'utilisateurs'
      });
    };
  
    return Role;
  };
  