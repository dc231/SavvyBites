const {unresolvedComplaint}= require("./unresolvedComplaintDigest");

const schedule = require('node-schedule');

const morningEmailJob = schedule.scheduleJob('0 6 * * *', function () {
  unresolvedComplaint(); // Call the email sending function
});

// Export the job for reference (optional)
module.exports = morningEmailJob;
