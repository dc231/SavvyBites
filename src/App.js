import "./App.css";
import { Routes,Route} from "react-router-dom";
import { useSelector } from "react-redux";
import Transation from "./pages/Transation";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./core/PrivateRoute";
import MyProfile from "./components/Dashboard/MyProfile";
import Settings from "./components/Dashboard/Settings";
import Complaints from "./components/Dashboard/Complaints";
import MyComplaints from "./components/Dashboard/MyComplaints";
import RegisterComplain from "./components/Dashboard/RegisterComplain";
import ResolveComplaint from "../src/pages/ResolveComplaint";
import RateReview from "../src/pages/RateReview";
import Home from "../src/pages/Home"
import AllStudents from "./components/Dashboard/AllStudents";

function App() {
  const { user } = useSelector((state) => state.auth)
  return (
    
    <Routes>
     <Route path="/" element={<Home/>} />
     <Route
          path="signup"
          element={        
              <SignupForm />         
          }
        />
    <Route
          path="login"
          element={          
              <LoginForm />
          }
        />
    <Route
          path="forgot-password"
          element={
            
              <ForgotPassword />
            
          }
        />  

      <Route
          path="verify-email"
          element={
            
              <VerifyEmail />
            
          }
        />  

    <Route
          path="update-password/:id"
          element={
              <UpdatePassword />
            //</OpenRoute>
          }
        />  
      {/* <Route 
          path="dashboard"
          element={
            <Dashboard/>
          }
          /> */}

<Route 
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    >
      <Route path="dashboard/my-profile" element={<MyProfile />} />
      <Route path="dashboard/Settings" element={<Settings />} />
      <Route path="/dashboard/all-open-complaints" element={<Complaints />} />
      <Route path="dashboard/Settings" element={<Settings />} />
      
       {
        user?.UserType === "Student" && (
          <>
          <Route path="/dashboard/register-complain" element={<RegisterComplain />} />
          <Route path="/dashboard/my-complaints" element={<MyComplaints />} />
          <Route path="/dashboard/rateAndReview/:id" element={<RateReview />} />
          </>
        )
      }

      {
         (user?.UserType === "ChiefWarden" || user?.UserType === "Professor" )&& (
          <>
            <Route path="/dashboard/my-complaints" element={<MyComplaints/>} />
            <Route path="/dashboard/resolveComplaint/:id" element={<ResolveComplaint />} />
            <Route path="/dashboard/allStudents" element={<AllStudents />} />
          </>
         )
      }

      {
         user?.UserType === "Accountant" && (
          <>
            <Route path="/dashboard/mealRecords" element={<Transation/>} />
          </>
         )
      }

    
    </Route>


     <Route path="*" element={"error"} />
    </Routes>
  );
}

export default App;
