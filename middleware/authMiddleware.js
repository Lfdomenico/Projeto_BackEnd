const setLocals = (req, res, next) => {
    if (req.session.user) {
      res.locals.user = req.session.user; 
      res.locals.isAdmin = req.session.user.tipo === 'admin';
      res.locals.isAluno = req.session.user.tipo === 'aluno';
    } else {
      res.locals.user = null;
      res.locals.isAdmin = false;
      res.locals.isAluno = false;
    }
    next();
  };
  
  
  const checkAuth = (req, res, next) => {
    if (req.session.user) {
      return next();
    }
    res.redirect('/login');
  };

  const isAdmin = (req, res, next) => {
   
    if (req.session.user.tipo === 'admin') {
      return next();
    }
    
    res.redirect('/'); 
  };
  
 
  const isAluno = (req, res, next) => {
    if (req.session.user.tipo === 'aluno') {
      return next();
    }
  
    res.redirect('/');
  };
  
  module.exports = { setLocals, checkAuth, isAdmin, isAluno };