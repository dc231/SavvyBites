const mongoose = require("mongoose");

// Define the RatingAndReview schema
const rateAndCommentsSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	rating: {
		type: Number,
		required: true,
	},
	comments: {
		type: String,
		required: true,
	},
	complain: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Complaint",
		index: true,
	},
});

// Export the RatingAndReview model
module.exports = mongoose.model("RateAndComments", rateAndCommentsSchema);
