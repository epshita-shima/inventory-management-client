import { Route, Routes } from "react-router-dom";
import DynamicDropdown from "./components/DynamicDropdown";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setLoading, setUser } from "./redux/features/user/userSlice";
import { useEffect } from "react";
import { auth } from "./lib/firebase";
import Home from "./pages/Home/Home";
import SignUpMongodb from "./pages/SignUp/SignUpMongodb";
import LoginWithMongodb from "./pages/Login/LoginWithMongodb";
import UserListInfo from "./components/UserListInformation/Index/UserListInfo";
import UserCreation from "./components/UserListInformation/Insert/UserCreation";
import SingleUserDisplay from "./components/UserListInformation/Update/SingleUserDisplay";


function App() {
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
    <div className="App">
      {/* <DynamicDropdown data={apiData} />; */}
      {/* <Home></Home> */}
      <Routes>
        {/* <Route path="/" element={<SignUp></SignUp>}></Route> */}
        <Route path="/" element={<SignUpMongodb/>}></Route>
        <Route path="/login" element={<LoginWithMongodb></LoginWithMongodb>}></Route>
        {/* <Route path="/login" element={<Login></Login>}></Route> */}
        <Route path="/project" element={<Home></Home>}></Route>
        <Route path="/user-creation" element={<UserCreation></UserCreation>}></Route>
        <Route path="/user-update/:id" element={<SingleUserDisplay></SingleUserDisplay>}></Route>
        <Route path="/user-list-data" element={<UserListInfo></UserListInfo>}></Route>
      </Routes>
    </div>
  );
}

export default App;
