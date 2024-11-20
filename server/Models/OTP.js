const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	otp: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
	},
});

// Define a function to send emails
async function sendVerificationEmail(email, otp) {
	// Create a transporter to send emails

	// Define the email options
	const emailContent = `
	<h1>Otp Verification</h1>
	<p>Dear User,</p>
	<p>Thank you for registering with MealExpanse And Resolution. To complete your registration, please use the following OTP
		(One-Time Password) to verify your account:</p>
	<h2 class="highlight">${otp}</h2>
   <p>This OTP is valid for 5 minutes.</p> 
  `;
	// Send the email
	try {
		const mailResponse = await mailSender(
			email,
			"Verification Email",
			emailContent
		);
		console.log("Email sent successfully: ", mailResponse.response);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}

// Define a post-save hook to send email after the document has been saved
OTPSchema.pre("save", async function (next) {
	console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;