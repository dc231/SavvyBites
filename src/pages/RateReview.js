import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getComplainDetails } from "../services/operations/complaintApi";
import { createRating } from "../services/operations/complaintApi";

export default function RateReview() {
  const { user, token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const [complain, setComplain] = useState(null);
  const { id } = useParams();

  const ComplainsDetails = async () => {
    try {
      console.log(id);
      const res = await getComplainDetails(id, token);
      console.log(res);
      setComplain(res);
    } catch (error) {
      console.log("Could not fetch  complains details");
    }
  };

  useEffect(() => {
    ComplainsDetails();
  }, []);
  console.log("Inside Rate Review");
  //  console.log(complain);
  console.log(id);
  console.log("End");
  //  console.log(complain.description);
  // console.log(complain.student.name);
  // console.log(complain.image);

  //const complainId=complain._id;
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState(null);

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value, 10));
  };

  const handleReviewChange = (event) => {
    setComments(event.target.value);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(createRating(rating, comments, id, token));
  };

  return (
    <>
      <img
        src={complain?.image}
        className="object-cover w-full  rounded-md mb-4"
        alt="Complaint Image"
      />
      <div className="flex items-center justify-center medium-h-screen bg-richblack-500">
        {/* <div className="mb-14 flex items-center justify-between bg-richblack-500"> */}
        <div className="flex flex-row mx-16 card bg-richblack-500 p-4">
          {/* <img src={complain?.image} className="w-full h-48 object-cover rounded-md mb-4" alt="Complaint Image" /> */}
          <div>
            <h2 className="text-richblue-800 font-semibold mt-4 mb-2">
              Details
            </h2>
            <div className=" justify-between items-center mb-2">
              <h4 className="text-white text-lg font-semibold">
                By- {complain?.student?.name}
              </h4>
              <h4 className="text-white text-lg font-semibold">
                Category: {complain?.category}
              </h4>
              <h4 className="text-white text-lg font-semibold">
                Hostel: {complain?.hostel}
              </h4>
              <h4 className="text-white text-lg font-semibold">
                Body: {complain?.description}
              </h4>
            </div>

            {/* Display existing ratings and reviews */}
            {complain?.rateAndComments &&
              complain?.rateAndComments.length > 0 && (
                <div>
                  <h2 className="text-richblue-800 font-semibold mt-4 mb-2">
                    Existing Ratings and Comments
                  </h2>
                  <ul className="list-disc text-white pl-8">
                    {complain.rateAndComments.map((item, index) => (
                      <li key={index} className="mb-2">
                        <strong>Rating:</strong> {item.rating},{" "}
                        <strong>Comments:</strong> {item.comments}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>

          <div className="mx-15 ml-12">
            <h2 className="text-richblue-800 font-semibold mt-4">
              Rating and Review Form
            </h2>
            <form onSubmit={handleOnSubmit}>
              <label className="text-white block">
                Rating:
                <select
                  value={rating}
                  onChange={handleRatingChange}
                  className="mt-1 p-2 w-full border rounded-md"
                >
                  <option value={0}>Select Rating</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </label>
              <br />
              <label className="text-white block">
                Comments:
                <textarea
                  value={comments}
                  onChange={handleReviewChange}
                  className="mt-1 p-2 w-full text-black border rounded-md"
                />
              </label>
              <br />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>


   

  );
}
