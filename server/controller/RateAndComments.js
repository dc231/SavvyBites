const RateAndComments = require("../Models/RateAndComments");
const Complaint = require("../Models/Complaint");

exports.createRating= async (req, res) => {
    try{

        const userId=req.user.id;      
        const {rating, comments, complainId} = req.body;
       
        const complainDetails = await Complaint.findOne(
                                    {_id:complainId});

        if(!complainDetails) {
            return res.status(404).json({
                success:false,
                message:'Complain does not exist',
            });
        }
    
        console.log(userId);
        console.log(complainId);
        const alreadyCommented = await RateAndComments.findOne({
                                                user:userId,
                                                complain:complainId,
                                            });
        if(alreadyCommented) {
                    return res.status(403).json({
                        success:false,
                        message:'Complain is already reviewed by the user',
                    });
                }
        
        const ratingComments= await RateAndComments.create({
                                        rating, comments, 
                                        complain:complainId,
                                        user:userId,
                                    });
       
        
        const updatedComplainDetails = await Complaint.findByIdAndUpdate({_id:complainId},
                                    {
                                        $push: {
                                            rateAndComments: ratingComments._id,
                                        }
                                    },
                                    {new: true});
        console.log(updatedComplainDetails);
        
        return res.status(200).json({
            success:true,
            message:"rating and comments is created successfully",
            data:ratingComments,
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"complaint not found",
            message:error.message,
        })
    }
};


