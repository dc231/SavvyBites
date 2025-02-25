const User = require("../Models/Users");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

exports.resetPasswordToken = async(req,res) =>{
    try{
        const email = req.body.email;
        const user = await User.findOne({email:email});
       
        if(!user){
            return res.json({
                success:false,
                message:'this email is not registered',
            })
        }
        const token = crypto.randomBytes(20).toString("hex");
       
        const updatedDetails = await User.findOneAndUpdate(
            {email:email},
            {
                token:token,
                resetPasswordExpires: Date.now() + 3600000,
            },
            {new:true}
        );

        console.log(updatedDetails);

        const url= `http://localhost:3000/update-password/${token}`;
        await mailSender(
			email,
			"Password Reset",
			`<h1>Your Link for email verification is ${url}. Please click this url to reset your password.</h1>`
		);

		res.json({
			success: true,
			message:
				"Email Sent Successfully, Please Check Your Email to Continue Further",
		});
    }
    catch(error){
        console.log(error);
        return res.json({
            success:false,
            error:error.message,
            message:`Some error in sending reset url`
        })
    }
};


exports.resetPassword = async(req,res)=>{
     try{       
        const {password,confirmPassword,token}=req.body;
        if(password!==confirmPassword){
            return res.json({
                success:false,
                message:"Password and confirmpassword did not match",
            })
        }
        const userDetails = await User.findOne({ token: token });
		if (!userDetails) {
			return res.json({
				success: false,
				message: "Token is Invalid",
			});
		}

        if (!(userDetails.resetPasswordExpires > Date.now())) {
			return res.status(403).json({
				success: false,
				message: `Token is Expired, Please Regenerate Your Token`,
			});
		}
        const encryptedPassword = await bcrypt.hash(password, 10);
		await User.findOneAndUpdate(
			{ token: token },
			{ password: encryptedPassword },
			{ new: true }
		);
		res.json({
			success: true,
			message: `Password Reset Successful`,
		});
     }
     catch{
        return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});
     }
}
