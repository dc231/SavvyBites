import { useEffect, useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { getComplainDetails } from "../services/operations/complaintApi"
import { resolveAComplain } from "../services/operations/complaintApi"

export default function RateReview() {
  const { user,token } = useSelector((state) => state.auth);

  const navigate = useNavigate()
  const [complain, setComplain] = useState(null)
  const { id } = useParams();

  const ComplainsDetails = async () => {
    try {
    
     console.log(id);
      const res = await getComplainDetails(id,token);
       console.log(res);
      setComplain(res);
    } catch (error) {
      console.log("Could not fetch  complains details")
    }
  };
  
    useEffect(() => {
      ComplainsDetails();
    }, [])
       console.log("Inside Rate Review");
    //  console.log(complain);
      console.log(id);
     console.log("End");
    //  console.log(complain.description);
    // console.log(complain.student.name);
    // console.log(complain.image);
    
    //const complainId=complain._id;
    const dispatch = useDispatch()
    
  
     const complainerId=complain?.student?._id;
     console.log("Inside resolve complaint")
     console.log(complainerId);
     console.log("end of resolve complain userid")
    
  
    
  const [resolution, setResolution] = useState(null);

  const handleResolvedChange = (event) => {
    setResolution(event.target.value);
  };

  console.log(resolution);
  console.log(token);
    const handleOnSubmit = (e) => {
      e.preventDefault()
      dispatch(resolveAComplain(complainerId,resolution,id,token))
    }
  
    

  return (

<div className="flex items-center justify-center min-h-screen">
  <div className="mb-14 card bg-richblack-500">
    <img src={complain?.image} className="object-cover w-full rounded-md mb-4" alt="Complaint Image" />
    <div className="tour-details text-center">
      <h4 className="text-white text-lg font-semibold">By- {complain?.student?.name}</h4>
      <h4 className="text-white text-lg font-semibold">Category: {complain?.category}</h4>
      <h4 className="text-white text-lg font-semibold">Hostel: {complain?.hostel}</h4>
    </div>
    <div className="description text-white text-center">
      Body: {complain?.description}
    </div>

    {/* Display existing ratings and reviews */}
    {complain?.rateAndComments && complain?.rateAndComments.length > 0 && (
      <div className="text-center">
        <h2 className="text-richblue-800 font-semibold mt-4 mb-2">
          Existing Ratings and Comments
        </h2>
        <ul className="list-disc text-white pl-8">
          {complain.rateAndComments.map((item, index) => (
            <li key={index} className="mb-2">
              <strong>Rating:</strong> {item.rating}, <strong>Comments:</strong> {item.comments}
            </li>
          ))}
        </ul>
      </div>
    )}

    <div className="text-center">
      <h2 className="text-richblue-800 font-semibold mt-4">Type A Resolution Message</h2>
      <form onSubmit={handleOnSubmit} className="text-white">
        <label className="flex flex-col  mt-2">
          Resolution Message:
          <textarea
            value={resolution}
            onChange={handleResolvedChange}
            className="mt-1 p-2 w-[40%] border text-black rounded-md mx-auto"
          />
        </label>
        <br />
        <button
          type="submit"
          className="w-[25%] bg-blue-500 text-white p-2 mb-4 rounded-md hover:bg-blue-600 mt-2"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</div>


  )
}