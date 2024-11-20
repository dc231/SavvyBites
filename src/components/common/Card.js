import { useState } from "react";
import IconBtn from "../common/IconBtn"
import { RiEditBoxLine } from "react-icons/ri"
import { useNavigate } from "react-router-dom"


function Card({_id,description,image,hostel,category,student,status,resolution,type}){
    console.log(_id);
    //   console.log(image);
    //   console.log(description);
    //   console.log(hostel);
    //   console.log(category);
    //   console.log(type);

    const navigate = useNavigate()
    const[readmore,setReadmore]=useState(false);
    const info = readmore?description:`${description.substring(0,200)}....`;

    function readmoreHandler(){
        setReadmore(!readmore);
    }
     return(
      

        <div className="bg-richblack-500 p-4 rounded-lg">
      <img src={image} className="w-full h-48 object-cover rounded-md mb-4" alt="Complaint Image" />
      <div className=" justify-between items-center mb-2">
        <h4 className="text-white text-lg font-semibold">By- {student?.name}</h4>
        <h4 className="text-white text-lg font-semibold">Category: {category}</h4>
        <h4 className="text-white text-lg font-semibold">Hostel: {hostel}</h4>
      </div>
      <div className="text-white mb-4">
        {info}
        <span className="text-blue-500 cursor-pointer" onClick={readmoreHandler}>
          {readmore ? ` Show less` : ` Read more`}
        </span>
      </div>
      {status === "Resolved" && (
        <h4 className="text-white">{resolution}</h4>
      )}
      {type === "Student" && status === "Open" && (
        <IconBtn
          text="Rate And Review"
          onclick={() => {
            navigate(`/dashboard/rateAndReview/${_id}`);
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      )}

      {type !== "Student" && type !== "Accountant" && status === "Open" && (
        <IconBtn
          text="Resolve Complaint"
          onclick={() => {
            navigate(`/dashboard/resolveComplaint/${_id}`);
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      )}
    </div>
     )
}

export default Card;