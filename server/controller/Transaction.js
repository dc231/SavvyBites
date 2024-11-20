const moment = require("moment"); 
const MenuItem = require("../Models/MenuItem");
const Tranasation = require("../Models/Transaction");


const getAllTransaction = async(req,res)=>{
    try{
        const {frequency,selectDate,type} =req.body;
        const transactions = await Tranasation.find({
           ...(frequency!=='custom' ?{
            date:{
                $gt : moment().subtract(Number(frequency),"d").toDate(), 
              },
           }:{
            date:{
                
                $gt:selectDate[0],
                $lt:selectDate[1],
            },
           }),
           userid: req.body.userid,
           ...(type!=='all' && {type })
        });   
         res.status(200).json(transactions); 
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

const editTransaction=async(req,res)=>{
   try{
      await Tranasation.findOneAndUpdate(
        {_id: req.body.transacationId },
        req.body.payload
      );
      res.status(200).send("Edit Successfully");
   }
   catch(error){
    console.log(error)
    res.status(500).json(error);
   }
};
const deleteTransaction=async(req,res)=>{
   try{
     await Tranasation.findOneAndDelete({_id:req.body.transacationId})
     res.status(200).send("Tranasation Deleted");
   }
   catch(error){
      console.log(error);
      res.status(500).json(error)  
   }
}
const addTransaction =async (req,res) =>  {
    try{
       const newTransection = new Tranasation(req.body);
       await newTransection.save();
       res.status(201).send("Transection Created");
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports= {getAllTransaction ,addTransaction,editTransaction,deleteTransaction};
