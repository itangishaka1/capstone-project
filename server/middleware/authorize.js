const jwt = require('jsonwebtoken')

function authorize(req, res, next) {
    // STEP 2: Logic for getting the token and
    // decoding the contents of the token. The
    // decoded contents should be placed on req.decoded
    // If the token is not provided, or invalid, then
    // this function should not continue on to the
    // end-point and respond with an error status code.
    

    const bearerHeader = req.headers['authorization'];
    
    if(!bearerHeader) {
      return res.status(401).send('Please login')
    }
    if (bearerHeader) {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      
      req.token = bearerToken;
      if(req.token === null) {
        return
      }
      
      const decoded = jwt.verify(req.token, process.env.JWT_SECRET);
      if(decoded.JsonWebTokenError) {
          return res.send('Invalid Token From authorization!!!')
      }
      
      req.decoded = decoded;
    }
    
    next();
  }

  module.exports = authorize