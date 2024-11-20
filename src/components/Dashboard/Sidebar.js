
import { useSelector } from "react-redux"
import { sidebarLinks } from "../../data/dashboardlinks"
import SidebarLink from "./Sidebarlinks"

export default function Sidebar() {

  const { user,loading: authLoading } = useSelector((state) => state.auth)

  if (authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <>
      {/* <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10"> */}
      <div className="flex h-[calc(100vh-3.5rem)] w-[15%]  s:w-[30%]  lg:w-[20%] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10 ">
        <div className="flex flex-col">
          {sidebarLinks.map((link) => {

            if (link.type && user?.UserType !== link.type) return null
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            )
          })}
        </div>
        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
        <div className="flex flex-col">
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />
          
            
        </div>
      </div>
      
    </>

   
  )
}