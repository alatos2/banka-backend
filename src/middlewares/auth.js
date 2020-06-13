const authentication = {
  // Middleware to check if the user is authenticated via google account
  isUserAuthenticatedViaGoogle(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.send('You must login');
    }
  }
};

export default authentication;
