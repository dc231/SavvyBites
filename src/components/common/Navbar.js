



import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../services/operations/authApi";
import { NavbarLinks } from "../../data/navlinks";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };

  const closeOverlay = () => {
    setIsOverlayVisible(false);
  };

  useEffect(() => {
    const handleRouteChange = () => {
      closeOverlay();
    };

    if (isOverlayVisible) {
      window.addEventListener("popstate", handleRouteChange);
    }

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [isOverlayVisible]);

  return (
    <div
      className={`flex h-12 bg-richblack-800 rounded-tl rounded-tr justify-content-center justify-center justify-alignment-center items-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-400">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                <Link to={link?.path}>
                  <p
                    className={`${
                      matchRoute(link?.path)
                        ? "text-yellow-200"
                        : "text-richblack-400"
                    }`}
                  >
                    {link.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-x-4 md:flex">
          {user && token !== null && (
            <Link to="/dashboard/my-profile" className="relative">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Dashboard
              </button>
            </Link>
          )}

          {user && token !== null && (
            <button
              onClick={() => {
                dispatch(logout(navigate));
              }}
              className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100"
            >
              Logout
            </button>
          )}

          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
        </div>

        <button className="mr-4 md:hidden" onClick={toggleOverlay}>
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>

        {isOverlayVisible && (
          <>
            <div className="fixed inset-0 bg-black opacity-50" onClick={closeOverlay}></div>
            {/* <div className="fixed top-0 right-0 left-0 bottom-0 lg:bottom-auto bg-slate-100 p-8"> */}
            <div className="fixed top-0  left-0 bottom-0 lg:bottom-auto bg-richblack-500 p-8 max-w-[50%] mx-auto">
              {/* <div className="top-0 right-0"> */}
                <button 
                className="absolute top-4 right-4 "
                onClick={closeOverlay}>
                  <AiOutlineClose className="text-4xl" />
                </button>
              {/* </div> */}
              <ul className="mt-8 lg:hidden flex flex-col items-center justify-center ">
                {NavbarLinks.map((link, index) => (
                  <li key={index} className="mb-4">
                    <Link to={link?.path} onClick={closeOverlay}>
                      <p
                        className={`${
                          matchRoute(link?.path) ? "text-yellow-200" : "text-richblack-700"
                        }`}
                      >
                        {link.title}
                      </p>
                    </Link>
                  </li>
                ))}

         {user && token !== null && (
            <Link to="/dashboard/my-profile" className="relative">
              <button className="mb-4 rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Dashboard
              </button>
            </Link>
          )}


        {user && token !== null && (
            <button
              onClick={() => {
                dispatch(logout(navigate));
              }}
              className=" mb-4 rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100"
            >
              Logout
            </button>
          )}

          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
        {/* </div> */}

              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
