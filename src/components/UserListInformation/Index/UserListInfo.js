/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useMemo, useState } from "react";
import "./UserListInfo.css";
import DataTable from "react-data-table-component";
import FilterComponent from "./FilterComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faEye,
  faFile,
  faPenToSquare,
  faRefresh,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import UserListModal from "./UserListModal/UserListModal";
import UserActivationModal from "./UserActivationModal/UserActivationModal";

import { useNavigate } from "react-router-dom";
import {
  useDeleteUserMutation,
  useGetAllUserQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "../../../redux/features/user/userApi";
import UserActiveListModal from "./UserActiveListModal/UserActiveListModal";
import { Font } from "@react-pdf/renderer";

import swal from "sweetalert";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logoImage from "../../../assets/images/logo-1933884_640.webp";
import { useGetCompanyInfoQuery } from "../../../redux/features/companyinfo/compayApi";
import { addFooter, downloadPDF } from "../../ReportProperties/HeaderFooter";
import handleDownload from "../../ReportProperties/HandelExcelDownload";

const UserListInfo = () => {
  const [userId, setUserId] = useState(null);
  const { data: user } = useGetAllUserQuery(undefined);
  const { data: companyinfo } = useGetCompanyInfoQuery(undefined);
  const [activeUserModal, setActiveUserModal] = useState(false);
  const [inActiveUserModal, setInActiveUserModal] = useState(false);
  console.log(companyinfo?.length)
  const [deleteUser, { isLoading, isSuccess, isError }] =
    useDeleteUserMutation();
    var reportTitle="All Active User"
console.log(reportTitle)
  console.log(companyinfo);
  const navigate = useNavigate();
  const activeUser = user?.filter((user) => user.isactive == true);
  const inActiveUser = user?.filter((user) => user.isactive == false);
  const [extractedData, setExtractedData] = useState([]);
  const [extractedInActiveData, setExtractedInActiveData] = useState([]);
  const [demoData, setDemoData] = useState(null);
  // Extracting specific fields from the initial data and updating the state
  const data = [
    { Name: 'John', Age: 30 },
    { Name: 'Jane', Age: 25 },
    { Name: 'Doe', Age: 35 }
  ];
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
    setExtractedData(extractedFields)
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

  console.log(extractedData);

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
            style={{
              color: "#56CCAD",
              border: "2px solid #56CCAD",
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

          <a
            target="_blank"
            className="action-icon"
            style={{
              color: "#56CCAD",
              border: "2px solid #56CCAD",
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
          <a
            target="_blank"
            className="action-icon "
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
        backgroundColor: "#CBF3F0",
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

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
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
      <>
        <div className="d-flex justify-content-end align-items-center">
          <div className="table-head-icon d-flex">
            <div>
              <FontAwesomeIcon icon={faRefresh}></FontAwesomeIcon> &nbsp;
            </div>
            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon>
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <a class="dropdown-item" href="#" onClick={()=>{
                    if(companyinfo?.length !==0 || undefined){
                      downloadPDF({companyinfo},reportTitle)
                    }
                    }}>
                    PDF
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#" onClick={()=>{handleDownload(extractedData,companyinfo,reportTitle)}}>
                    Excel
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>{" "}
        &nbsp;
        <FilterComponent
          onFilter={(e) => setFilterText(e.target.value)}
          onClear={handleClear}
          filterText={filterText}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/> */}
        </div>
      </>
    );
  }, [filterText, resetPaginationToggle,companyinfo,extractedData,reportTitle]);

  return (
    <div className="container-fluid p-0 m-0">
      <nav class="navbar navbar-expand-lg" style={{ background: "#CBF3F0" }}>
        <div class="container">
          <div
            class="collapse navbar-collapse d-flex justify-content-start align-items-center"
            id="navbarNav"
          >
            <ul class="navbar-nav ">
              <li class="nav-item nav-button-active">
                <a class="active nav-link text-uppercase">Product List</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link text-uppercase
          "
                  href="#"
                >
                  Product Creation
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-uppercase" href="#">
                  Product Creation Rules
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-uppercase" href="#">
                  Sustainable Fibercoin(s)
                </a>
              </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
              <button
                class="btn text-light bg-dark my-2 my-sm-0"
                onClick={() => {
                  navigate("/user-creation");
                }}
              >
                Create User
              </button>
            </form>
          </div>
        </div>
      </nav>
      <div class="container mt-4">
        <div class="row">
          <div class="col-sm-3">
            <div
              class="cardbox shadow-lg"
              style={{ borderLeft: "12px solid #1EDFBD", borderRadius: "10px" }}
            >
              <div
                class="card-body"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                <p
                  class="card-title"
                  style={{
                    color: "#8091a5",
                    fontSize: "13px",
                    fontWeight: "600",
                  }}
                >
                  Total User
                </p>
                <h5
                  class="card-text"
                  style={{ color: "#000", fontSize: "30px", fontWeight: "700" }}
                >
                  {user?.length}
                </h5>
              </div>
            </div>
          </div>
          <div class="col-sm-3">
            <div
              class="cardbox shadow-lg"
              style={{
                borderLeft: "12px solid  #CBF3F0",
                borderRadius: "10px",
              }}
            >
              <div
                class="card-body"
                data-toggle="modal"
                data-target="#exampleModalCenter"
                onClick={() => {
                  setActiveUserModal(true);
                }}
              >
                <p
                  class="card-title"
                  style={{
                    color: "#8091a5",
                    fontSize: "13px",
                    fontWeight: "600",
                  }}
                >
                  Total Active User
                </p>
                <h5
                  class="card-text"
                  style={{ color: "#000", fontSize: "30px", fontWeight: "700" }}
                >
                  {activeUser?.length}
                </h5>
              </div>
            </div>
          </div>
          <div class="col-sm-3">
            <div
              class="cardbox shadow-lg"
              style={{ borderLeft: "12px solid red", borderRadius: "10px" }}
            >
              <div
                class="card-body"
                data-toggle="modal"
                data-target="#exampleModalCenter"
                onClick={() => {
                  setInActiveUserModal(true);
                }}
              >
                <p
                  class="card-title"
                  style={{
                    color: "#8091a5",
                    fontSize: "13px",
                    fontWeight: "600",
                  }}
                >
                  Total Inactive User
                </p>
                <h5
                  class="card-text"
                  style={{ color: "#000", fontSize: "30px", fontWeight: "700" }}
                >
                  {inActiveUser?.length}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container mt-5">
        <div class="row">
          <div className="col">
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
