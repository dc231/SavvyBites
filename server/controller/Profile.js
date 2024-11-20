 const Profile = require("../Models/Profile");
const User = require("../Models/Users");
const {uploadImageToCloudinary} = require("../utils/imageUploader");

exports.updateProfile = async (req, res) => {
	try {
		const { dateOfBirth = "", about = "", contactNumber,gender } = req.body;
		const id = req.user.id;

		const userDetails = await User.findById(id);
		const profile = await Profile.findById(userDetails.additionalDetails);
         
		profile.dateOfBirth = dateOfBirth;
		profile.about = about;
		profile.contactNumber = contactNumber;
         profile.gender=gender;
		// Save the updated profile
		await profile.save();
		// userDetails.additionalDetails=profile._id;
		// userDetails.save();
		return res.json({
			success: true,
			message: "Profile updated successfully",
			profile,
			userDetails,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};


exports.deleteAccount = async (req, res) => {
	try {
		
		console.log("Printing ID: ", req.user.id);
		const id = req.user.id;
		
		const user = await User.findById({ _id: id });
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}
		// Delete Assosiated Profile with the User
		await Profile.findByIdAndDelete({ _id: user.additionalDetails });
		
		await User.findByIdAndDelete({ _id: id });
		res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ success: false, message: "User Cannot be deleted successfully" });
	}
};

exports.getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();
		console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.updateDisplayPicture = async (req, res) => {
    try {
		console.log("Inside controller")
		console.log(req.files)
      const displayPicture = req.files.displayPicture
	  console.log(displayPicture)
	  console.log("end")
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
	  console.log("before picture")
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  
exports.getUserComplaints = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("complains")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.complains,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};


exports.getAllUsers = async (req,res)=>{
	try{
	const users = await User.find({UserType:"Student"});
	return res.status(200).json({
        success: true,
        data: users,
      })
	}
	catch(error){
		return res.status(404).json({
			success:false,
			message:error.message,
		})
	}

}

exports.deleteAccountById = async (req, res) => {
	try {
		
		const {id} = req.body;
		console.log("inside delete controller")
		console.log(id)
		console.log("end of delete")
		const user = await User.findById({ _id: id });
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}
		// Delete Assosiated Profile with the User
		await Profile.findByIdAndDelete({ _id: user.additionalDetails });
		
		await User.findByIdAndDelete({ _id: id });
		res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ success: false, message: "User Cannot be deleted successfully" });
	}
};
