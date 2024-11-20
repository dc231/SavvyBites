
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import  Card  from "../common/Card"
import { getUserCompaints } from "../../services/operations/profileApi" 


export default function MyComplains() {
  const { user,token } = useSelector((state) => state.auth);
  //console.log(user)
  const navigate = useNavigate()
  const [complains, setComplains] = useState([])

  const UserComplains = async () => {
    try {
    
    //  console.log(token);
      const res = await getUserCompaints(token);

      setComplains(res);
    } catch (error) {
      console.log("Could not fetch user complains.")
    }
  };
  
    useEffect(() => {
      UserComplains();
    }, [])

  return (
    <div>
      <div className="mb-14 items-center justify-between">
        <h1 className="text-3xl mb-6 font-medium text-richblack-5">My Complains</h1>
        <div className="flex flex-wrap">
          {complains.map((complain, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 px-2 mb-4">
              <Card {...complain} type={user.UserType} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}