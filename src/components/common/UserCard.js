
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { deleteProfileById } from "../../services/operations/profileApi"

function UserCard(user){
       console.log("Inside user card")
       console.log(user?.name)
       console.log(user)
       console.log("end of user card")

       const { token } = useSelector((state) => state.auth)
       const dispatch = useDispatch()
       const navigate = useNavigate()
     
       async function handleDeleteAccount() {
         try {
            console.log("CLICKED");
            console.log(user?._id)
           dispatch(deleteProfileById(user?._id,token, navigate))
         } catch (error) {
           console.log("ERROR MESSAGE - ", error.message)
         }
       }

     return (
        <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-500 p-8 px-12">
        <div className="flex items-center gap-x-4"> 

          {/* for image */}
          <img
            src={user?.image}
            alt={`profile-${user?.name}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          /> 

           {/* for email */} 
           <div className="space-y-1">
            <p className="text-lg font-semibold text-richblack-5">
              {user?.name}
            </p>
            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div> 

        <button
            type="button"
            className={`flex items-center ${
                 "bg-yellow-50"
              } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 sm:w-full md:w-auto `}
              
            onClick={handleDeleteAccount}
          >
            Delete Account
          </button>
      </div> 
     )
}

export default UserCard;