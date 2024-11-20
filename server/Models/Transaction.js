const mongoose = require ('mongoose')

  const transectionSchema = new mongoose.Schema({
     
    userid:{       
        type:String,
        
    },
    amount:{       
        type:Number,
        required:true,
    },
    type:{       
        type:String,
        requird:true,
    },
    category:{    
        type:String,
        reuired:true,
    },
    date:{
        type:Date,
        required:true,
    },
  },
  { timestamps:true}
  );

  module.exports = mongoose.model("Transaction",transectionSchema);
