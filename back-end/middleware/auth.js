require('dotenv').config()

const jwt = require('jsonwebtoken') ; 
const secretKey = process.env.TOKEN; 
const expirationTime = 2 * 60 * 60; // 2 hours in seconds

const generateToken=(payload )=>{
   return jwt.sign(payload, secretKey , { expiresIn: expirationTime })
}

// function to verify the token 

const  authenticate= (req, res, next)=> {
    // Extract the token from the request headers
    const token = req.headers.authorization?.split(' ')[1] || '';
  
    try {
      // Verify and decode the token
      const decoded = jwt.verify(token, secretKey);
        console.log(decoded) ; 
      // Add the decoded payload to the request object for further use
      req.user = decoded;
  
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  }
  
  
module.exports = {
    authenticate,
    generateToken
  };