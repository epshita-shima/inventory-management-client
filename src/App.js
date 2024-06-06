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
import UserCreation from "./components/UserListInformation/Insert/UserCreation";
import SingleUserDisplay from "./components/UserListInformation/Update/SingleUserDisplay";
import LoginWithUsername from "./pages/Login/LoginWithUsername";
import Footer from "./pages/Footer/Footer";
import MainView from "./components/MainView/MainView";
import ChangePasswordModal from "./pages/Login/ChangePasswordModal";
import RequireAuth from "./pages/RequireAuth/RequireAuth";
import NotFound from "./pages/NotFound/NotFound";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreateMenu from "./components/MenuInformation/Insert/CreateMenu";
import MenuDataList from "./components/MenuInformation/Index/MenuDataList";
import UpdateMenu from "./components/MenuInformation/Update/UpdateMenu";
import UserListInfo from "./components/UserListInformation/Index/UserDataTable/UserListInfo";
import UserDataList from "./components/UserListInformation/Index/UserDataList";
import FGItemInfoTableData from "./components/FGItemProfile/ItemProfileInformation/Index/FGItemInfoTableData";
import InsertFgItemInfo from "./components/FGItemProfile/ItemProfileInformation/Insert/InsertFgItemInfo";
import UpdateFgItemInfo from "./components/FGItemProfile/ItemProfileInformation/Update/UpdateFgItemInfo";
import InsertRmItemInfo from "./components/RMItemProfile/ItemProfileInformation/Insert/InsertRmItemInfo";
import UpdateRmItemInfo from "./components/RMItemProfile/ItemProfileInformation/Update/UpdateRmItemInfo";
import RMItemInfoTableData from "./components/RMItemProfile/ItemProfileInformation/Index/RMItemInfoTableData";

function App() {
  const [singleUserData, setSingleUserData] = useState([]);
  const [changePassword, setChangePassword] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);

  const getMenulistData = localStorage.getItem("user");

  const menuListData = JSON.parse(getMenulistData);

  return (
    <div>
      <div className="app-container">
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <LoginWithUsername
                  singleUserData={singleUserData}
                  setSingleUserData={setSingleUserData}
                ></LoginWithUsername>
              }
            ></Route>
            <Route
              path="/main-view"
              element={
                <MainView
                  setChangePassword={setChangePassword}
                  setResetPassword={setResetPassword}
                ></MainView>
              }
            >
              <Route index element={<Dashboard></Dashboard>}></Route>
              <Route
                path="change-password"
                element={
                  <ChangePasswordModal
                    menuListData={menuListData}
                    singleUserData={singleUserData}
                    setSingleUserData={setSingleUserData}
                    resetPassword={resetPassword}
                    changePassword={changePassword}
                  />
                }
              ></Route>
              <Route
                path="/main-view/create-user"
                element={
                  // <RequireAuth>
                  <UserCreation></UserCreation>
                  //  </RequireAuth>
                }
              ></Route>
              <Route
                path="/main-view/user-setting"
                element={
                  // <RequireAuth>
                  <UserDataList
                    setChangePassword={setChangePassword}
                    setResetPassword={setResetPassword}
                    resetPassword={resetPassword}
                    changePassword={changePassword}
                  ></UserDataList>
                  //  </RequireAuth>
                }
              ></Route>

              <Route
                path="user-update/:id"
                element={<SingleUserDisplay></SingleUserDisplay>}
              ></Route>
              <Route  path="/main-view/create-item-(rm)" element={<InsertRmItemInfo></InsertRmItemInfo>}></Route>
              <Route  path="/main-view/item-list-(rm)" element={<RMItemInfoTableData></RMItemInfoTableData>}></Route>
              <Route  path="update-items-rm/:id" element={<UpdateRmItemInfo></UpdateRmItemInfo>}></Route>
              {/* <Route path="/main-view/create-item-(rm)" element={<UpdateRmItemInfo></UpdateRmItemInfo>}></Route> */}
              <Route
                path="/main-view/item-list-(fg)"
                element={<FGItemInfoTableData></FGItemInfoTableData>}
              ></Route>
              <Route
                path="/main-view/create-item-(fg)"
                element={<InsertFgItemInfo></InsertFgItemInfo>}
              ></Route>
              {/* <Route
                path="/main-view/user-list"
                element={
                  // <RequireAuth>
                    <UserListInfo
                      setChangePassword={setChangePassword}
                      setResetPassword={setResetPassword}
                      resetPassword={resetPassword}
                      changePassword={changePassword}
                    ></UserListInfo>
                  // </RequireAuth>
                }
              ></Route> */}
              <Route
                path="create-menu"
                element={<CreateMenu></CreateMenu>}
              ></Route>
              <Route
                path="update-menu/:id"
                element={<UpdateMenu></UpdateMenu>}
              ></Route>
              <Route
                path="update-items/:id"
                element={<UpdateFgItemInfo></UpdateFgItemInfo>}
              ></Route>
              <Route
                path="menu-list"
                element={<MenuDataList></MenuDataList>}
              ></Route>
              <Route path="*" element={<NotFound></NotFound>}></Route>
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
