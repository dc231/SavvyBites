const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../Models/Users");

const auth = async (req, res, next) => {
  try {
    // Extract token 
    const token = req.cookies.token || req.body.token || req.header("Authorization")?.replace("Bearer ", "");
   
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    // Verify the token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById({ _id: decoded.id });

      // If user not found in the database, return error response
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid token",
        });
      }

      // Attach the user to the request object
      req.user = user;
      next();
    } catch (err) {
      // Token verification failed
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
  } catch (error) {
    // Something went wrong while validating the token
    return res.status(500).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

const isStudent = async (req, res, next) => {
  try{
         if(req.user.UserType !== "Student") {
             return res.status(401).json({
                 success:false,
                 message:'This is a protected route for Students only',
             });
         }
         next();
  }
  catch(error) {
     return res.status(500).json({
         success:false,
         message:'User role cannot be verified, please try again'
     })
  }
 }
 
 const isAccountant = async (req, res, next) => {
     try{
            if(req.user.UserType !== "Accountant") {
                return res.status(401).json({
                    success:false,
                    message:'This is a protected route for Accountant only',
                });
            }
            next();
     }
     catch(error) {
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified, please try again'
        })
     }
    }
 
 
 const isProfsOrChiefWarden = async (req, res, next) => {
     try{    
            
            if(req.user.UserType !== "Professor" && req.user.UserType !== "ChiefWarden") {
                return res.status(401).json({
                    success:false,
                    message:'This is a protected route for Profs and warden only',
                });
            }
            next();
     }
     catch(error) {
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified, please try again'
        })
     }
    }


    const isStudentRepresentative = async (req, res, next) => {
        try{    
               if(req.user.UserType !== "StudentRepresntative") {
                   return res.status(401).json({
                       success:false,
                       message:'This is a protected route for Student Representative only',
                   });
               }
               next();
        }
        catch(error) {
           return res.status(500).json({
               success:false,
               message:'User role cannot be verified, please try again'
           })
        }
       }
   
module.exports = {auth,isProfsOrChiefWarden,isAccountant,isStudent,isStudentRepresentative};
