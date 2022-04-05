module.exports = {
  checkSession: async (req, res, next) => {
    if (!req.session.user) {
      console.log('not logged');
      return res.redirect('/');
    }
    next();
  }
}