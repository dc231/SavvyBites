const Complaint=require('../Models/Complaint');
const mailSender = require('../utils/mailSender');
const User = require('../Models/Users');

exports.unresolvedComplaint= async() =>{
    try{
      const unresolvedComplaints = await Complaint.find({ status: "Open" });
      console.log(unresolvedComplaints.length);
      const emailContent = `
        <h1>Unresolved Complaints Digest</h1>
        <ul>
        ${unresolvedComplaints.map(complaint => `<h1>${complaint.category}</h1>
     <h4>${complaint.description}</h4>`).join('')}
       </ul>
      `;
      
      mailSender(process.env.ADMIN_MAIL,"Unresolved Complaints",emailContent);
      return unresolvedComplaints;
    }
    catch(error){
      console.log(error);
    }
  }
  
//***Index.js */
    // cron.schedule('0 6 * * *', () => {
    //    sendUnresolvedComplaintsDigest();
    //   console.log('Scheduled task: Sending unresolved complaints digest');
    // });
  
    // ${unresolvedComplaints.map(complaint => `<h1>${complaint.name}</h1>
    // <h4>${complaint.description}</h4>`).join('')}