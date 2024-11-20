const mongoose = require('mongoose');
const validator = require('validator');
const Complaint = require('./Complaint');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true

    },
    email : {
        type : String,
        required : true,
        trim: true,
    },
    password : {
        type : String,
        required : true

    },
    complains :[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Complaint"
        }
    ],
    image : {
       type: String,
       required : true,
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile",
    },
    token: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
    cpassword : {
        type : String,
    },
    UserType : {
        type: String,
		enum: ["StudentRepresntative", "Accountant", "Student","Professor","ChiefWarden"],
    },
    //{ timestamps: true }
},
{ timestamps: true },
);

module.exports = mongoose.model('Users',userSchema);