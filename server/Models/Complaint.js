const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    student: {
		type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"Users"
	},
  description: {
    type: String,
    required: true,
  },
  image:{
    type:String,
  },
  hostel:{
    type:String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Open', 'Resolved'],
    default: 'Open',
  },
  resolution:{
    type:String,
  }, // contains resolution message when complain is resolved
  rateAndComments: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RateAndComments",
    },
],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

complaintSchema.pre('save', function (next) {
    this.updated_at = new Date();
    next();
  });

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
