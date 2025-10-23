const Usuario = require('../models/sequelize/Usuario');

const authController = {
  showLogin: (req, res) => {
    res.render('login');
  },


  login: async (req, res) => {
    const { login, senha } = req.body;
    try {
      const usuario = await Usuario.findOne({ where: { login: login, ativo: true } });

      if (!usuario) {
        return res.redirect('/login');
      }

      const senhaValida = await usuario.validarSenha(senha);

      if (!senhaValida) {
        return res.redirect('/login');
      }

      req.session.user = {
        id: usuario.id,
        nome: usuario.nome,
        tipo: usuario.tipo
      };

    
      if (usuario.tipo === 'admin') {
        res.redirect('/admin/dashboard');
      } else {
        res.redirect('/aluno/dashboard');
      }

    } catch (error) {
      console.error(error);
      res.redirect('/login');
    }
  },

  logout: (req, res) => {
    req.session.destroy(err => {
      if (err) console.error(err);
      res.redirect('/');
    });
  }
};
module.exports = authController;