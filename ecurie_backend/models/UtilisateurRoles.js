module.exports = (sequelize, DataTypes) => {
    const UtilisateurRoles = sequelize.define('UtilisateurRoles', {
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Utilisateurs',
          key: 'id_user'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'role_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    }, {
      timestamps: false,
      tableName: 'UtilisateurRoles'
    });
  
    return UtilisateurRoles;
  };
  