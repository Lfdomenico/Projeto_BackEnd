// Middleware para popular res.locals (Dica Prática)
// Use isso em TODAS as rotas (app.use(setLocals))
const setLocals = (req, res, next) => {
    if (req.session.user) {
      res.locals.user = req.session.user; // { id, nome, tipo }
      res.locals.isAdmin = req.session.user.tipo === 'admin';
      res.locals.isAluno = req.session.user.tipo === 'aluno';
    } else {
      res.locals.user = null;
      res.locals.isAdmin = false;
      res.locals.isAluno = false;
    }
    next();
  };
  
  // Middleware para checar se está logado
  const checkAuth = (req, res, next) => {
    if (req.session.user) {
      return next();
    }
    // req.flash('error', 'Você precisa estar logado para acessar esta página.');
    res.redirect('/login');
  };
  
  // Middleware para checar se é Admin
  const isAdmin = (req, res, next) => {
    // checkAuth já garante que req.session.user exista
    if (req.session.user.tipo === 'admin') {
      return next();
    }
    // req.flash('error', 'Acesso negado. Área restrita para administradores.');
    res.redirect('/'); // ou '/dashboard' do aluno
  };
  
  // Middleware para checar se é Aluno
  const isAluno = (req, res, next) => {
    if (req.session.user.tipo === 'aluno') {
      return next();
    }
    // req.flash('error', 'Acesso negado.');
    res.redirect('/');
  };
  
  module.exports = { setLocals, checkAuth, isAdmin, isAluno };