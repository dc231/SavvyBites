import { toast } from "react-hot-toast"
//import { setProfileData } from "../../slices/profileSlice"
//import { setLoading, setUser } from "../../slices/authSlice"
import { apiConnector } from "../apiConnector"
import { profileEndpoints } from "../apis"
import { logout } from "./authApi"

const { GET_USER_DETAILS_API,
   GET_USER_COMPLAINTS_API,
    GET_ALL_USERS_API,
  DELETE_ACCOUNT_BY_ID_API,

   } = profileEndpoints

export async function getUserDetails(token, navigate) {
   
    const toastId = toast.loading("Loading...")
   // dispatch(setLoading(true))
    let response=null;
    try {
      console.log("Inside get user details profile api")
       response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log(response);
      console.log("GET_USER_DETAILS API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
    //   const name=response.data.data.name;
    //   const nameParts =name.split(" ");
		// const firstName = nameParts[0];
		// const lastName = nameParts[nameParts.length-1];
    //     console.log(name);
    //     console.log(firstName);
      // const userImage = response.data.data.image
      //   ? response.data.data.image
      //   : `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        //dispatch(setProfileData({...response.data.data.additionalDetails}));
    //  dispatch(setUser({ ...response.data.data, image: userImage }))
    } catch (error) {
      //dispatch(logout(navigate))
      console.log("GET_USER_DETAILS API ERROR............", error)
      toast.error("Could Not Get User Details")
    }
    toast.dismiss(toastId)
  //  dispatch(setLoading(false))

  return response;
}

export async function getUserCompaints(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    console.log("BEFORE Calling BACKEND API FOR USER COMPLAIN");
    const response = await apiConnector(
      "GET",
      GET_USER_COMPLAINTS_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    // console.log(
    //   "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
    //   response
    // )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data
  } catch (error) {
    console.log("GET_USER_COMPLAIN_API API ERROR............", error)
    toast.error("Could Not Get User Complain")
  }
  toast.dismiss(toastId)
  return result
}


export const getAllUsersDetails = async (token) => {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector("GET", GET_ALL_USERS_API,
    null,
    {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch All Users")
    }
    console.log(response);
    result = response?.data?.data
  } catch (error) {
    console.log("GET_ALL_USERS_API API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export function deleteProfileById(id,token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("DELETE", DELETE_ACCOUNT_BY_ID_API,{ id}, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE_ACCOUNT_BY_ID_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile Deleted Successfully")
      dispatch(logout(navigate))
    } catch (error) {
      console.log("DELETE_ACCOUNT_BY_ID_API API ERROR............", error)
      toast.error("Could Not Delete Profile")
    }
    toast.dismiss(toastId)
  }
}
