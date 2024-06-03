/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useMemo, useState } from "react";
import "./UserListInfo.css";
import DataTable from "react-data-table-component";
import FilterComponent from "./FilterComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faEye,
  faGear,
  faPenToSquare,
  faRefresh,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import UserListModal from "../UserListModal/UserListModal";
import UserActivationModal from "../UserActivationModal/UserActivationModal";

import { useNavigate } from "react-router-dom";
import {
  useDeleteUserMutation,
  useGetAllUserQuery,
} from "../../../../redux/features/user/userApi";
import UserActiveListModal from "../UserActiveListModal/UserActiveListModal";
import { Font } from "@react-pdf/renderer";
import swal from "sweetalert";
import "jspdf-autotable";
import { useGetCompanyInfoQuery } from "../../../../redux/features/companyinfo/compayApi";
import { downloadPDF } from "../../../ReportProperties/HeaderFooter";
import handleDownload from "../../../ReportProperties/HandelExcelDownload";
import { Button } from "react-bootstrap";
import ListHeading from "../../../Common/ListHeading/ListHeading";

const UserListInfo = ({
  setChangePassword,
  setResetPassword,
  resetPassword,
  changePassword,
  permission
}) => {
  const [userId, setUserId] = useState(null);
  const { data: user } = useGetAllUserQuery(undefined);
  const { data: companyinfo } = useGetCompanyInfoQuery(undefined);
  const [activeUserModal, setActiveUserModal] = useState(false);
  const [inActiveUserModal, setInActiveUserModal] = useState(false);
  const [deleteUser, { isLoading, isSuccess, isError }] =
    useDeleteUserMutation();
  const navigate = useNavigate();
  const activeUser = user?.filter((user) => user.isactive == true);
  const inActiveUser = user?.filter((user) => user.isactive == false);
  const [extractedData, setExtractedData] = useState([]);
  const [extractedInActiveData, setExtractedInActiveData] = useState([]);
  const [demoData, setDemoData] = useState(null);
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
    var reportTitle = "All Active User";

  // useEffect(() => {
  //   if (localStorage.length > 0) {
  //     const getUserId = localStorage.getItem("user");
  //     const userSingleId = JSON.parse(getUserId);
  //     const userIdFromSession = userSingleId[0]?._id;
  //     const permidionData = user?.filter(
  //       (user) => user._id == userIdFromSession
  //     );
  //     setPermissionResult(permidionData);
  //     setUserIdFromLocalStorage(userIdFromSession);
  //   } else {
  //     navigate("/");
  //   }
  // }, [navigate, user]);

  // const extractUserListForCurrentUser = (userData, userId) => {
  //   let userList = null;

  //   // Find the user object matching the provided userId
  //   const currentUser = userData?.find((user) => user._id === userId);

  //   if (currentUser) {
  //     // Loop through the menus of the current user
  //     currentUser?.menulist?.forEach((menu) => {
  //       menu?.items?.forEach((subMenu) => {
  //         // Check if the subMenu is the "User Profile" menu
  //         if (subMenu?.label === subMenu?.label) {
  //           // Find the "User List" sub-item
  //           const userListSubMenu = subMenu?.items.find(
  //             (subItem) => subItem?.label === subItem?.label
  //           );
  //           if (userListSubMenu) {
  //             // Set the user list property
  //             userList = userListSubMenu;
  //           }
  //         }
  //       });
  //     });
  //   }

  //   return userList;
  // };

  // // Call the function to get the user list for the current user
  // const permission = extractUserListForCurrentUser(
  //   permissionResult,
  //   userIdFromLocalStorage
  // );

  // // Output the user list for the current user
  // console.log(permission);

  useEffect(() => {
    const activeUsers = user?.filter((user) => user.isactive == true);
    const inActiveUser = user?.filter((user) => user.isactive == false);
    const extractedFields = activeUsers?.map((item) => ({
      firstname: item.firstname,
      mobileNo: item.mobileNo,
      username: item.username,
    }));
    const extractedInactiveFields = inActiveUser?.map((item) => ({
      firstname: item.firstname,
      mobileNo: item.mobileNo,
      username: item.username,
    }));
    setExtractedData(extractedFields);
    setExtractedInActiveData(extractedInactiveFields);
  }, [user]);

  useEffect(() => {
    // Fetch the JSON data
    const fetchData = async () => {
      try {
        const response = await fetch("jsonData.json"); // Adjust the path to your JSON file
        const data = await response.json();
        setDemoData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  Font.register({
    family: "Oswald",
    src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
  });

  const handleActiveStatus = (id) => {
    setUserId(id);
  };

  const columns = [
    {
      name: "Sl.",
      selector: (activeUser, index) => index + 1,
      center: true,
      width: "60px",
    },
    {
      name: "Name",
      selector: (activeUser) => activeUser?.firstname,
      sortable: true,
      center: true,
      filterable: true,
    },
    {
      name: "User Name",
      selector: (activeUser) => activeUser?.username,
      sortable: true,
      center: true,
      filterable: true,
    },
    {
      name: "Mobile No",
      selector: (activeUser) => activeUser?.mobileNo,
      sortable: true,
      center: true,
    },

    {
      name: "Action",
      button: true,
      width: "200px",
      grow: 2,
      cell: (activeUser) => (
        <div className="d-flex justify-content-between align-content-center">
          <a
            target="_blank"
            className="action-icon"
            data-toggle="tooltip"
            data-placement="bottom"
            title="View user"
            style={{
              color: "#2DDC1B",
              border: "2px solid #2DDC1B",
              padding: "3px",
              borderRadius: "5px",
            }}
          >
            <FontAwesomeIcon
              data-toggle="modal"
              data-target="#exampleModalLong"
              icon={faEye}
              onClick={() => {
                handleActiveStatus(activeUser?._id);
              }}
            ></FontAwesomeIcon>
          </a>
          {permission?.update ? (
            <a
              target="_blank"
              className="action-icon"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Update user"
              style={{
                color: "#2DDC1B",
                border: "2px solid #2DDC1B",
                padding: "3px",
                borderRadius: "5px",
                marginLeft: "10px",
              }}
              onClick={() => {
                window.open(`user-update/${activeUser?._id}`);
                // handleActiveStatus(activeUser?._id);
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
            </a>
          ) : (
            ""
          )}

          <a
            target="_blank"
            className="action-icon "
            style={{
              background: "#2DDC1B",
              padding: "5px",
              color: "#000",
              borderRadius: "5px",
              marginLeft: "10px",
            }}
          >
            <FontAwesomeIcon
              data-toggle="tooltip"
              data-placement="bottom"
              title="Reset password"
              icon={faGear}
              onClick={() => {
                setResetPassword(true);
                setChangePassword(false);
                const url = `/main-view/change-password?reset=true&change=false`;
                window.open(url, "_blank");
              }}
            ></FontAwesomeIcon>
          </a>
          {permission?.delete ? (
            <a
              target="_blank"
              className="action-icon "
              data-toggle="tooltip"
              data-placement="bottom"
              title="Delete user"
              style={{
                color: "red",
                border: "2px solid red",
                padding: "3px",
                borderRadius: "5px",
                marginLeft: "10px",
              }}
              onClick={() => {
                swal({
                  title: "Are you sure?",
                  text: "Once deleted, you will not be able to recover this data!",
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                }).then((willDelete) => {
                  if (willDelete) {
                    deleteUser(activeUser?._id);
                    swal("Poof! Your data has been deleted!", {
                      icon: "success",
                    });
                  } else {
                    swal("Your data is safe!");
                  }
                });
              }}
            >
              <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
            </a>
          ) : (
            ""
          )}
        </div>
      ),
    },
  ];
  const customStyles = {
    rows: {
      style: {
        textAlign: "center",
      },
    },
    headCells: {
      style: {
        backgroundColor: "#B8FEB3",
        color: "#000",
        fontWeight: "bold",
        textAlign: "center",
        letterSpacing: "0.8px",
      },
    },
    cells: {
      style: {
        borderRight: "1px solid gray",
      },
    },
  };


  const filteredItems = activeUser?.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <div className="d-block d-sm-flex justify-content-center align-items-center ">
      
        <div className="d-flex justify-content-end align-items-center">
          <div className="table-head-icon d-flex ">
            <div>
              <FontAwesomeIcon icon={faRefresh}></FontAwesomeIcon> &nbsp;
            </div>
            <div class="dropdown">
              <button
                class="btn btn-download dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon>
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <a
                    class="dropdown-item"
                    href="#"
                    onClick={() => {
                      if (companyinfo?.length !== 0 || undefined) {
                        downloadPDF({ companyinfo }, reportTitle);
                      }
                    }}
                  >
                    PDF
                  </a>
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    href="#"
                    onClick={() => {
                      handleDownload(extractedData, companyinfo, reportTitle);
                    }}
                  >
                    Excel
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-2 mt-sm-0 ms-2 mb-2 mb-sm-0">
          <FilterComponent
            onFilter={(e) => setFilterText(e.target.value)}
            onClear={handleClear}
            filterText={filterText}
          />
        </div>
      </div>
    );
  }, [
    filterText,
    resetPaginationToggle,
    companyinfo,
    extractedData,
    reportTitle,
  ]);

  return (
    <div className="row px-4 mx-4">
     <ListHeading 
     user={user}
     setActiveUserModal={setActiveUserModal}
     activeUser={activeUser}
     setInActiveUserModal={setInActiveUserModal}
     inActiveUser={inActiveUser}
     ></ListHeading>
      <div class=" mt-5">
        <div class="row">
          <div
            className="col userlist-table"
            style={{
              overflowX: "scroll",
              height: "400px",
            }}
          >
            <div className="shadow-lg overflow-x-auto flex-nowarp">
              <DataTable
                columns={columns}
                data={filteredItems}
                defaultSortField="name"
                customStyles={customStyles}
                striped
                pagination
                subHeader
                subHeaderComponent={subHeaderComponent}
              />
            </div>
          </div>
        </div>
      </div>
      <table id="my-table" className="d-none">
        <thead>
          <tr>
            <th>Sl.</th>
            <th>First name</th>
            <th>User Name</th>
            <th>Mobile No</th>
          </tr>
        </thead>
        <tbody>
          {extractedData?.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.firstname}</td>
              <td>{item.username}</td>
              <td>{item.mobileNo}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <UserListModal user={user}></UserListModal>
      <UserActivationModal userId={userId}></UserActivationModal>
      {activeUserModal ? (
        <UserActiveListModal
          user={activeUser}
          activeUserModal={activeUserModal}
          setActiveUserModal={setActiveUserModal}
          extractedData={extractedData}
          companyinfo={companyinfo}
        ></UserActiveListModal>
      ) : (
        ""
      )}
      {inActiveUserModal ? (
        <UserActiveListModal
          user={inActiveUser}
          inActiveUserModal={inActiveUserModal}
          setInActiveUserModal={setInActiveUserModal}
          extractedInActiveData={extractedInActiveData}
          companyinfo={companyinfo}
        ></UserActiveListModal>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserListInfo;
