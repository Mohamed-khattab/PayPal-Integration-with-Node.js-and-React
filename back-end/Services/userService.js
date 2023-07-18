require('dotenv').config()
const jwt = require('jsonwebtoken');
const userQueries = require('../DataBase/queries') ; 
const bcrypt = require('bcrypt');


// function to check if the provided is mail or not 

const validateEmailAndPassword =( email ,pass )=>{

       if (!email || !email.includes("@")) {
        return false;
      }
      // Password validation
      if (!pass || pass.length < 8) {
        return false
      }
      // If both email and password are valid, return true or perform additional logic
      return true;
    
} ; 

const checkIfFound = async(email)=>{
  const oldUser = await userQueries.findUserByEmail( email );
  if(oldUser) 
      return oldUser ;  // already found 
  
}

const registerUser =async (name , email , pass  )=>{
  console.log({"email": email ,
               "pass ": pass , 
               "name ": name}) ; 
  encryptedPassword = await bcrypt.hash(pass, 10);
  try{
    const user = await userQueries.createUser(name , email , encryptedPassword)
    return true ; 
  }catch(e){
    console.log({"error" : e}) ; 
    return false ; 
  }
}


const  verifyPassword = async(password, hashedPassword)=> {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    console.error('Error in verifyPassword:', error);
    throw new Error('An error occurred while verifying the password');
  }
}


module.exports= {
    validateEmailAndPassword , 
    registerUser  ,
    checkIfFound , 
    verifyPassword
}