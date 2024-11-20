const Complaint=require('../Models/Complaint');
const mailSender = require('../utils/mailSender');
const User = require('../Models/Users');
const RateAndComments=require('../Models/RateAndComments');
const {uploadImageToCloudinary} = require('../utils/imageUploader');

exports.createComplaint= async(req,res)=>{
    try{  
         const userId=req.user.id;
         let{
            description,
            hostel,
            category
         }= req.body;
         const Image=req.files.image;
         if(!description ||
            !hostel ||
            !category){
            {
                return res.status(400).json({
                  success: false,
                  message: "All Fields are Mandatory",
                })
              }
         }

        // if(image){
            const complainImage = await uploadImageToCloudinary(
                Image,
                process.env.FOLDER_NAME
              )
              console.log(complainImage);
        //  }

         const student = await User.findById(userId, {
            accountType: "Student",
          })
      
          if (!student) {
            return res.status(404).json({
              success: false,
              message: "Student is not registered",
            })
          }
          
          
          const newComplaint = await Complaint.create({
            student:userId,
             description,
             hostel,
             category,
             image:complainImage.secure_url,
          })
         // if(image) newComplaint.image=Image.secure_url;
        
         await User.findByIdAndUpdate(
          {
            _id: student._id,
          },
          {
            $push: {
              complains: newComplaint._id,
            },
          },
          { new: true }
        )


          res.status(200).json({
            success: true,
            data: newComplaint,
            message: "Complaint is Created Successfully",
          })
    }
    catch(error){
        console.error(error)
        res.status(500).json({
          success: false,
          message: "Failed to create complain",
          error: error.message,
        })
    }
}

exports.deleteComplaint= async(req,res)=>{
  try{
       const {complainId} = req.body;
      const complain= await Complaint.findById(complainId);

      if(!complain){
        return res.status(404).json({ message: "Complain not found" })
      }

      await Complaint.findByIdAndDelete(complainId);
      return res.status(200).json({
        success: true,
        message: "Complain deleted successfully",
      })
  }
  catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

// exports.updateComplaint= async(req,res)=>{
//   try{
//       const {complainId}=req.body;
//       const complain= await Complaint.findById(complainId);

//       if(!complain){
//         return res.status(404).json({ message: "Complain not found" })
//       }

       
//   }
//   catch{

//   }
// }


exports.getAllOpenComplaint = async(req,res)=>{
  try {
    const allComplain = await Complaint.find(
      { status: "Open" },
      {
        category: true,
        description: true,
        hostel: true,       
        status:true,
        resolution:true,
        rateAndComments:true,
        student: true,
        image: true,
      }
    )
      .populate("rateAndComments")
      .populate("student")
      .exec()

    return res.status(200).json({
      success: true,
      data: allComplain,
    })
  } catch (error) {
    console.log(error)
    return res.status(404).json({
      success: false,
      message: `Can't Fetch Complaints`,
      error: error.message,
    })
  }
}

exports.resolveComplaint=async (req,res)=>{
   try{
       const {complainId} = req.body;
       const {resolution}= req.body;
       const {complainerId} = req.body;
       const userId=req.user.id;
      //  console.log("Inside controller resolve")
      //  console.log(complainId)
      //  console.log(resolution)
      //  console.log(userId);
      //  console.log("End of controller");

       const updatedComplaint = await Complaint.findByIdAndUpdate(
        complainId,
        { resolution,status:'Resolved' },
        { new: true }
      );
      if (!updatedComplaint) {
        return res.status(404).json('Complaint not found');
      }
      const emailContent = `
      <h1>Resolution of Your Complain</h1>
      <p>
         Thanks for your concern. We will try best regarding to this.
      </p>
    `;
      const user= await User.findById(complainerId);
      console.log(user.email);
      mailSender(user.email,"Complain is Resolve",emailContent);

      await User.findByIdAndUpdate(
        {
          _id: userId,
        },
        {
          $push: {
            complains: complainId,
          },
        },
        { new: true }
      )
      return res.status(200).json({
        success: true,
        message: "Complain is resolved successfully",
        data:updatedComplaint,
      })

   }
   catch(error){
     return res.status(404).json({
       success: false,
       message: 'Cannot Resolve Complaints',
       error: error.message,
     })
   }
}

exports.getfullComplaint = async(req,res)=>{
  try {
    const complainId= req.body;
    const id=Object.keys(complainId)[0];
    // console.log("inside controller");
    // console.log(complainId);
    // console.log(Object.keys(complainId)[0]);
    // console.log("complainId aayi");
    const complainDetails = await Complaint.findOne(
      {_id: id,}
    )
      .populate("rateAndComments")
      .populate("student")
      .exec()
     // console.log(complainDetails);
    return res.status(200).json({
      success: true,
      data: complainDetails,
    })
  } catch (error) {
    console.log(error)
    return res.status(404).json({
      success: false,
      message: `Can't Fetch Complaints Details`,
      error: error.message,
    })
  }
}

