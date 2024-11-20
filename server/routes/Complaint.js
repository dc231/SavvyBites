const express = require("express")
const router = express.Router()

const{
    createComplaint,
    deleteComplaint,
    getAllOpenComplaint,
    resolveComplaint,
    getfullComplaint,
}=require("../controller/Complaint");

const {createRating} = require("../controller/RateAndComments");

const {auth,isProfsOrChiefWarden,isAccountant,isStudent,isStudentRepresentative} = require("../middlewares/auth");


router.post("/createComplaint",auth,isStudent,createComplaint);
router.delete("/deleteComplaint",auth,isStudent,deleteComplaint);
router.get("/getAllOpenComplaint",auth,getAllOpenComplaint);
router.post("/getfullComplaint",auth,getfullComplaint);
router.post("/resolveComplaint",auth,resolveComplaint);
router.post("/createRating",auth,isStudent, createRating);
module.exports = router;

