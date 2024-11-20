import { RiEditBoxLine } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect,useState } from "react"
import { formattedDate } from "../../utils/dateFormatter"
import IconBtn from "../common/IconBtn"
import { getAllUsersDetails } from "../../services/operations/profileApi"
import UserCard from "../common/UserCard"


export default function AllStudents() {
  const { token } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [users,setUsers] = useState([]);
  
  const fetchUsers = async ()=>{
     try{
      const res = await getAllUsersDetails(token);
      console.log("inside student")
      console.log(res);
      console.log("end of students")
      setUsers(res);
     }
     catch(error){
        console.log("Could not get all users",error);
     }
  }

  useEffect(() => {
    fetchUsers();
  }, [])
    console.log(users)
  return (
     <>
<div>
    <div className="mb-14 items-center justify-between">
      <h1 className="text-3xl mb-6 font-medium text-richblack-5">All Students</h1> 
      <div className="flex flex-wrap">
        {users.map((user, index) => (
        //  console.log(user)
          <div key={index} className="w-full  px-2 mb-4">
          
            <UserCard {...user}  />
          </div>
          
        ))}
      </div>
    </div>
  </div>
</>
  )
}