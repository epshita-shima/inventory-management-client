import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllUserQuery } from "../../../redux/features/user/userApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import UserListInfo from "./UserDataTable/UserListInfo";

const UserDataList = ({
  setChangePassword,
  setResetPassword,
  resetPassword,
  changePassword,
}) => {
  const clickhandler = (name) => console.log("delete", name);
  const { data: user, isUserloading } = useGetAllUserQuery(undefined);
  const [permissionResult, setPermissionResult] = useState([]);
  const [userIdFromLocalStorage, setUserIdFromLocalStorage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.length > 0) {
      const getUserId = localStorage.getItem("user");
      const userSingleId = JSON.parse(getUserId);
      const userIdFromSession = userSingleId[0]?._id;
      const permidionData = user?.filter(
        (user) => user._id == userIdFromSession
      );
      setPermissionResult(permidionData);
      setUserIdFromLocalStorage(userIdFromSession);
    } else {
      navigate("/");
    }
  }, [navigate, user]);

  if (isUserloading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <button
          class="btn"
          style={{ backgroundColor: "#2DDC1B", color: "white" }}
          type="button"
          disabled
        >
          <span
            class="spinner-grow spinner-grow-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Loading...
        </button>
      </div>
    );
  }

  const extractUserListForCurrentUser = (userData, userId) => {
    let userList = null;

    // Find the user object matching the provided userId
    const currentUser = userData?.find((user) => user._id === userId);
console.log(currentUser)
    if (currentUser) {
      // Loop through the menus of the current user
      currentUser?.menulist?.forEach((menu) => {
        menu?.items?.forEach((subMenu) => {
          
          if(subMenu.items.length <= 0){
            if(subMenu.label=='User Setting'){
              userList=subMenu
            }
          }
          if (subMenu?.label === subMenu?.label) {
            const userListSubMenu = subMenu?.items.find(
              (subItem) => subItem?.label === 'User Setting'
            );
            console.log( userListSubMenu)
            if (userListSubMenu) {
              // Set the user list property
              userList = userListSubMenu;
            }
          }
        });
      });
    }

    return userList;
  };

  // Call the function to get the user list for the current user
  const permission = extractUserListForCurrentUser(
    permissionResult,
    userIdFromLocalStorage
  );

  // Output the user list for the current user
  console.log(permission);

  return (
    <div>
      <UserListInfo
        setChangePassword={setChangePassword}
        setResetPassword={setResetPassword}
        resetPassword={resetPassword}
        changePassword={changePassword}
        permission={permission}
        click={clickhandler}
      />
      {permission?.isInserted ? (
        <div
          className={`position-absolute`}
          style={{ right: "20%", bottom: "4%", zIndex: "9999" }}
        >
          <div className="">
            <a
              href="/main-view/create-user"
              target="_blank"
              className="text-white text-center d-flex justify-content-center align-items-center"
              style={{
                backgroundColor: "#2DDC1B",
                height: "40px",
                width: "40px",
                borderRadius: "50px",
                border:'1px solid #fff'
              }}
            >
              <FontAwesomeIcon
                className="text-white fs-4"
                icon={faPlus}
              ></FontAwesomeIcon>
            </a>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserDataList;
