const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');
const bcrypt = require('bcryptjs');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  login: { // ou email
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true // Se for usar e-mail
    }
  },
  senhaHash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM('aluno', 'admin'),
    allowNull: false,
    defaultValue: 'aluno'
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true,
  tableName: 'usuarios',
  hooks: {
    beforeCreate: async (usuario) => {
      if (usuario.senhaHash) {
        const salt = await bcrypt.genSalt(10);
        usuario.senhaHash = await bcrypt.hash(usuario.senhaHash, salt);
      }
    },
    beforeUpdate: async (usuario) => {
       if (usuario.changed('senhaHash')) {
        const salt = await bcrypt.genSalt(10);
        usuario.senhaHash = await bcrypt.hash(usuario.senhaHash, salt);
      }
    }
  }
});

// Método para comparar senha
Usuario.prototype.validarSenha = function(senha) {
  return bcrypt.compare(senha, this.senhaHash);
};

module.exports = Usuario;