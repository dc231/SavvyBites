const express = require("express")
const router = express.Router()

const {
  getAllTransaction,
  editTransaction,
  deleteTransaction,
  addTransaction
}=require("../controller/Transaction");

const {auth,isAccountant}=require("../middlewares/auth");
router.post("/addTransaction",auth,isAccountant,addTransaction);
router.post("/deleteTransaction",auth,isAccountant,deleteTransaction);
router.post("/getAllTransaction",auth,isAccountant,getAllTransaction);
router.post("/editTransaction",auth,isAccountant,editTransaction);

module.exports= router