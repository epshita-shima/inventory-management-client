import { Route, Router, Routes } from "react-router-dom";
import DynamicDropdown from "./components/DynamicDropdown";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setLoading, setUser } from "./redux/features/user/userSlice";
import { useEffect, useState } from "react";
import { auth } from "./lib/firebase";
import Home from "./pages/Home/Home";
import SignUpMongodb from "./pages/SignUp/SignUpMongodb";
import LoginWithMongodb from "./pages/Login/LoginWithMongodb";
import UserListInfo from "./components/UserListInformation/Index/UserListInfo";
import UserCreation from "./components/UserListInformation/Insert/UserCreation";
import SingleUserDisplay from "./components/UserListInformation/Update/SingleUserDisplay";
import LoginWithUsername from "./pages/Login/LoginWithUsername";
import Footer from "./pages/Footer/Footer";
import MainView from "./components/MainView/MainView";
import ChangePasswordModal from "./pages/Login/ChangePasswordModal";
import RequireAuth from "./pages/RequireAuth/RequireAuth";
import NotFound from "./pages/NotFound/NotFound";
import Dashboard from "./pages/Dashboard/Dashboard";


function App() {
  const [singleUserData,setSingleUserData]=useState([])
  const [changePassword,setChangePassword]=useState(false)
  const [resetPassword,setResetPassword]=useState(false)
  
  const dispatch = useDispatch();
  const apiData = [
    {
      label: "Item 1",
      children: [
        {
          label: "Subitem 1.1",
          children: [
            {
              label: "Sub-subitem 1.1.1",
              children: [],
            },
            // ... other sub-subitems
          ],
        },
        {
          label: "Subitem 1.2",
          children: [],
        },
        // ... other subitems
      ],
    },
    {
      label: "Item 2",
      children: [
        {
          label: "Subitem 1.1",
          children: [],
        },
      ],
    },
    // ... other items
  ];
  const getMenulistData = localStorage.getItem("user");
 
  const menuListData = JSON.parse(getMenulistData);
  // useEffect(()=>{
  //   dispatch(setLoading(true))
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       dispatch(setUser(user.email));
  //       dispatch(setLoading(false))
  //     }
  //     else{
  //       dispatch(setLoading(false))
  //     }
  //   });
  // },[dispatch])


  return (
    <div>
      <div className="app-container">
        <div className="content">
          <Routes>
          <Route path="/" element={<LoginWithUsername singleUserData={singleUserData} setSingleUserData={setSingleUserData}></LoginWithUsername>}></Route>
            <Route path="/main-view" element={<MainView setChangePassword={setChangePassword} setResetPassword={setResetPassword}></MainView>}>
              <Route index element={<Dashboard></Dashboard>}></Route>
              <Route path="change-password" element={<ChangePasswordModal menuListData={menuListData} singleUserData={singleUserData} setSingleUserData={setSingleUserData} resetPassword={resetPassword} changePassword={changePassword}/>}></Route>
              <Route path="user-creation" element={<RequireAuth><UserCreation></UserCreation></RequireAuth>}></Route>
              <Route path="user-update/:id" element={<SingleUserDisplay></SingleUserDisplay>}></Route>
              <Route path="user-list-data" element={<RequireAuth>
          <UserListInfo setChangePassword={setChangePassword} setResetPassword={setResetPassword} resetPassword={resetPassword} changePassword={changePassword}></UserListInfo>
        </RequireAuth>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
            </Route>
          {/* <Route path="/" element={<SignUpMongodb/>}></Route> */}
        {/* <Route path="/login" element={<LoginWithMongodb></LoginWithMongodb>}></Route> */}
       
        
        {/* <Route path="/login" element={<Login></Login>}></Route> */}
        {/* <Route path="/project" element={<Home singleUserData={singleUserData} setSingleUserData={setSingleUserData}></Home>}></Route> */}
       
       
        
    
          </Routes>
        </div>
      </div>
    
    </div>
  );
}

export default App;
