import { toast } from "react-hot-toast"

// import { setLoading } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector"
import { complainEndpoints } from "../apis"

const {
  GET_ALL_COMPLAINT_API,
  CREATE_COMPLAINT_API,
  DELETE_COMPLAINT_API ,
  RESOLVE_COMPLAINT_API,
  CREATE_RATING_API,
  GET_COMPLAINT_DETAILS_API,
} = complainEndpoints

export const getAllComplain = async (token) => {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector("GET", GET_ALL_COMPLAINT_API,
    null,
    {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Complain")
    }
    console.log(response);
    result = response?.data?.data
  } catch (error) {
    console.log("GET_ALL_COMPLAIN_API API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}


// add the course details
export const addComplain = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_COMPLAINT_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE COMPLAINT API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Complains Details")
    }
    toast.success("Complain Added Successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("CREATE COMPLAIN API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}


// delete a course
export const deleteComplain = async (data, token) => {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("DELETE", DELETE_COMPLAINT_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE COMPLAIN API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Complain")
    }
    toast.success("Complain Deleted")
  } catch (error) {
    console.log("DELETE COMPLAIN API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
}

// get full details of a course
// export const getFullDetailsOfCourse = async (courseId, token) => {
//   const toastId = toast.loading("Loading...")
//   //   dispatch(setLoading(true));
//   let result = null
//   try {
//     const response = await apiConnector(
//       "POST",
//       GET_FULL_COURSE_DETAILS_AUTHENTICATED,
//       {
//         courseId,
//       },
//       {
//         Authorization: `Bearer ${token}`,
//       }
//     )
//     console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)

//     if (!response.data.success) {
//       throw new Error(response.data.message)
//     }
//     result = response?.data?.data
//   } catch (error) {
//     console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
//     result = error.response.data
//     // toast.error(error.response.data.message);
//   }
//   toast.dismiss(toastId)
//   //   dispatch(setLoading(false));
//   return result
// }


// create a rating for course
export const createRating = async (rating, comments, complainId, token) => {
  const toastId = toast.loading("Loading...")
  let success = false
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, {
      rating, comments, complainId,
    }, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE RATING API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Rating")
    }
    toast.success("Rating Created")
    success = true
  } catch (error) {
    success = false
    console.log("CREATE RATING API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return success
}

export const getComplainDetails = async (complainId,token) => {
  const toastId = toast.loading("Loading...")
  let result = null;
  try {
    const response = await apiConnector("POST", GET_COMPLAINT_DETAILS_API,
    
      complainId 
    ,
    {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Complain")
    }
    // console.log("response printing")
    // console.log(response);
    result = response?.data?.data
  } catch (error) {
    console.log("GET_COMPLAINT_DETAILS_API API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}


export const resolveAComplain = async (complainerId,resolution, complainId, token) => {
  const toastId = toast.loading("Loading...")
  let success = false
  // console.log("jai mata di");
  // console.log(resolution);
  // console.log(complainId);
  // console.log(token);
  // console.log("End of resolve");
  try {
    const response = await apiConnector("POST", RESOLVE_COMPLAINT_API, {
      complainerId,resolution, complainId,
    }, {
      Authorization: `Bearer ${token}`,
    })
    console.log("RESOLVE COMPLAINT API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Resolve complaint api")
    }
    toast.success("Resolved Complaint")
    success = true
  } catch (error) {
    success = false
    console.log("RESOLVE COMPLAINT API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return success
}
