const express = require('express') ;
const userSerivces = require('../Services/userService') ;
const auth = require('../middleware/auth')



const login=  async (req , res )=>{

    const {email, password } = req.body;
    const user =  await userSerivces.checkIfFound(email) ; 
    if(! user )
    {
        return res.status(409).json({ "error": 'User not found . Please signup'});
    }
    console.log({
        'pass' : password , 
        "hashedpassword" : user.password
    })

    if (await userSerivces.verifyPassword(password, user.password)) {
        // Generate a token for the user
        const token = auth.generateToken({ userId: user.id, email: user.email });
        res.header('authorization', token);
        res.cookie('token', token, { maxAge: 2 * 60 * 60 * 1000 }); // Expires in 2 hours store it in cookies 
        // Send the token in the response
        res.status(200).json({ token });
      } else {
        return res.status(401).json({ error: 'Invalid password' });
      }
}


const signUp = async (req , res )=>{
  
    const { name, email, password } = req.body;
     const user =  await userSerivces.checkIfFound(email)
     console.log({"Ans" : user})
    if(!! user)
    {
        return res.status(409).json({ "error": 'User Already Exist. Please Login'});
    }
    if(userSerivces.validateEmailAndPassword(email , password )){
        if ( await userSerivces.registerUser(name , email , password)) {
            res.status(201).json({ message: 'User registered successfully!' });
        }else {
            res.status(500).json({ error: 'Internal server error occurred while creating the account.' });
        }
    }
    else {
        res.status(409).json({ "error": 'email must have @ and password must longer than 8 characters' });
    }

}

module.exports = {
    signUp,
    login
  };
  