import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setSignupData } from "../slices/authSlice"
import { sendOtp } from "../services/operations/authApi"
//import { signUp } from "../services/operations/authApi"

function SignupForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // student or instructor
  //const [UserType, setUserType] = useState("Student");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    UserType:"",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showcpassword, setShowcpassword] = useState(false)

  const { name, email, password, cpassword, UserType } = formData

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (password !== cpassword) {
      toast.error("Passwords Do Not Match")
      return
    }
    const signupData = {
      ...formData,
      //UserType,
    }
     
    console.log("name is",name);
		console.log("email is",email);
		console.log("User Type is",UserType);
		console.log("Password is",password);
		console.log("Cpassword is",cpassword);
    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData))
    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate))
    // Reset
    setFormData({
      name: "",
      email: "",
      password: "",
      cpassword: "",
      UserType:"Student",
    })
   // setUserType("Student");
  }

  // data to pass to Tab component
  // const tabData = [
  //   {
  //     id: 1,
  //     tabName: "Student",
  //     type: ACCOUNT_TYPE.STUDENT,
  //   },
  //   {
  //     id: 2,
  //     tabName: "Instructor",
  //     type: ACCOUNT_TYPE.INSTRUCTOR,
  //   },
  // ]

  return (
    <div>
      
      {/* Form */}
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-4">
        <label for="UserType">User Type</label>
    <select id="UserType" name="UserType"value={UserType}
            onChange={handleOnChange}>
      <option value="Student">Student</option>
      <option value="Professor">Professor</option>
      <option value="ChiefWarden">ChiefWarden</option>
      <option value="StudentRepresentative">StudentRepresentative</option>
      <option value="Accountant">Accountant</option>
    </select>
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="name"
              value={name}
              onChange={handleOnChange}
              placeholder="Enter your name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>
          
        </div>
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />
        </label>
        {/* <label for="UserType">User Type</label>
    <select id="UserType" name="UserType"value={UserType}
            onChange={handleOnChange}>
      <option value="Student">Student</option>
      <option value="Professor">Professor</option>
      <option value="ChiefWarden">ChiefWarden</option>
      <option value="StudentRepresentative">StudentRepresentative</option>
      <option value="Admin">Admin</option>
    </select> */}
        <div className="flex gap-x-4">
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showcpassword ? "text" : "password"}
              name="cpassword"
              value={cpassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowcpassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showcpassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Create Account
        </button>
      </form>
    </div>
  )
}

export default SignupForm