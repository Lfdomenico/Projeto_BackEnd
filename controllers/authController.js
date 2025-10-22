const Usuario = require('../models/sequelize/Usuario');

const authController = {
  // GET /login
  showLogin: (req, res) => {
    res.render('login');
  },

  // POST /login
  login: async (req, res) => {
    const { login, senha } = req.body;
    try {
      const usuario = await Usuario.findOne({ where: { login: login, ativo: true } });

      if (!usuario) {
        // req.flash('error', 'Usuário não encontrado ou inativo.');
        return res.redirect('/login');
      }

      const senhaValida = await usuario.validarSenha(senha);

      if (!senhaValida) {
        // req.flash('error', 'Senha incorreta.');
        return res.redirect('/login');
      }

      // Salva
      req.session.user = {
        id: usuario.id,
        nome: usuario.nome,
        tipo: usuario.tipo
      };

      // Redireciona baseado no tipo
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

  // GET /logout
  logout: (req, res) => {
    req.session.destroy(err => {
      if (err) console.error(err);
      res.redirect('/');
    });
  }
};
module.exports = authController;