import { RiEditBoxLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { formattedDate } from "../../utils/dateFormatter";
import IconBtn from "../common/IconBtn";
import { getUserDetails } from "../../services/operations/profileApi";

export default function MyProfile() {
  const { user, token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);
  const [profileImage, setProfileImage] = useState(user?.image);

  const fetchUserDetails = async () => {
    try {
      const res = await getUserDetails(token, navigate);
      console.log(res);
      console.log(res?.data?.data?.additionalDetails);
      setProfileImage(res?.data?.data?.image);
      setProfileData(res?.data?.data?.additionalDetails);
    } catch (error) {
      console.log("Could not get user details", error);
    }
  };
  useEffect(() => {
    fetchUserDetails();
  }, [token, navigate, dispatch]);

  //Console statement for checking purpose
  console.log("inside my profile");
  console.log(user);
  console.log(profileData);
  console.log("end of my profile");

  return (
    <>
      
      <h1 className="mb-14 text-3xl justify-center font-medium text-richblue-500">
        {/* My Profile */}
      </h1>

      {/* <main className="profile-page mt-25 bg-richblack-500"> */}
        <section className="py-16 mb-4 ">
          <div className="container mx-auto px-8 ">
            <div className="flex flex-col min-w-0 break-words bg-white w-full max-w-[1024] mb-6 shadow-xl rounded-lg -mt-32 lg:-mt-50">
              <div className="px-6">
                <div className="flex flex-wrap justify-center items-center">
                  <div className="w-full lg:w-3/12 lg:order-2 flex justify-center items-center">
                    <img
                      src={profileImage}
                      alt={`profile-${user?.name}`}
                      className="rounded-full h-auto align-middle border-none mt-4"
                    />
                  </div>
                </div>

                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                  {user?.name}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold ">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                    {user?.email}
                  </div>
                  <div className="mb-2 text-blueGray-600 mt-10">
                    <i className=" mr-2 text-lg text-blueGray-400"></i>
                     Gender -  {profileData?.gender ?? "Add Gender"}
                  </div>
                  <div className="mb-2 text-blueGray-600">
                    <i className=" mr-2 text-lg text-blueGray-400"></i>
                    Phone Number - {profileData?.contactNumber ?? "Add Contact Number"}
                  </div>
                  <div className="mb-2 text-blueGray-600">
                    <i className=" mr-2 text-lg text-blueGray-400"></i>
                    Date Of Birth -  {formattedDate(profileData?.dateOfBirth) ??
                  "Add Date Of Birth"}
                  </div>

                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p
                        className={`${
                          profileData?.about
                            ? "text-richblue-500"
                            : "text-richblue-800"
                        } mb-4 text-lg leading-relaxed`}
                      >
                        {profileData?.about ?? "Write Something About Yourself"}
                      </p>
                    </div>
                    <IconBtn
                      text="Edit"
                      onclick={() => {
                        navigate("/dashboard/settings");
                      }}
                    >
                      <RiEditBoxLine />
                    </IconBtn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      {/* </main> */}
    </>
  );
}
