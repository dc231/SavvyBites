import { toast } from "react-hot-toast"

import { setLoading, setToken ,setUser } from "../../slices/authSlice"
import { apiConnector } from "../apiConnector"
import { endpoints } from "../apis"

const {
  SENDOTP_API, 
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints


export function sendOtp(email,navigate) {
  return async(dispatch)=>{
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try{
      const response = await apiConnector("POST",SENDOTP_API,{
        email,
        checkUserPresent:true,
      })
      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
 };
  
export function signUp(
  name,
  email,
  password,
  cpassword,
  UserType,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      console.log("chal raha h");
      const response = await apiConnector("POST", SIGNUP_API, {
       
        name,
        email,
        password,
        cpassword,
        otp,
        UserType
      })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })
 
      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      const fullname=response.data.user.name;
                     const nameParts =fullname.split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts[nameParts.length-1];

      //console.log("FirstName",firstName);
      //console.log("LastName",lastName);
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
      dispatch(setUser({ ...response.data.user ,image: userImage}))
      
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate("/")
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}


export function getPasswordResetToken(email,setEmailSent){
  return async(dispatch) =>{
    dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST",RESETPASSTOKEN_API,{email});
      console.log("RESET PASSWORD TOKEN RESET",response);
      if(!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Reset Email Sent");
      setEmailSent(true);
    }
    catch(error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Failed to send email for resetting password");
    }
    dispatch(setLoading(false));
  }
}

export function resetPassword(password, confirmPassword, token) {
  return async(dispatch) => {
    dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST", RESETPASSWORD_API, {password, confirmPassword, token});

      console.log("RESET Password RESPONSE ... ", response);


      if(!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password has been reset successfully");
    }
    catch(error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Unable to reset password");
    }
    dispatch(setLoading(false));
  }
}
