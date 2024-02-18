/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useState } from "react";
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
import { useGetUserQuery } from "../../../redux/api/apiSlice";
import { useNavigate } from "react-router-dom";

const UserListInfo = () => {
// const {data}=useGetUserQuery(undefined)
// console.log(data)
const navigate=useNavigate()
const data = [
  {
    id: 1,
    name: "John Doe",
    mobile_no: "123-456-7890",
  },
  {
    id: 2,
    name: "Jane Smith",
    mobile_no: "987-654-3210",
  },
  {
    id: 3,
    name: "Michael Johnson",
    mobile_no: "555-555-5555",
  },
  {
    id: 4,
    name: "Emily Davis",
    mobile_no: "111-222-3333",
  },
  {
    id: 5,
    name: "David Wilson",
    mobile_no: "444-444-4444",
  },
  {
    id: 6,
    name: "Sarah Brown",
    mobile_no: "777-777-7777",
  },
  {
    id: 7,
    name: "Daniel Martinez",
    mobile_no: "888-888-8888",
  },
  {
    id: 8,
    name: "Lisa Taylor",
    mobile_no: "999-999-9999",
  },
  {
    id: 9,
    name: "Christopher Lee",
    mobile_no: "333-333-3333",
  },
  {
    id: 10,
    name: "Jessica Clark",
    mobile_no: "666-666-6666",
  },
  {
    id: 11,
    name: "Jessica Clark",
    mobile_no: "666-666-6666",
  },
];
  const columns = [
    {
      name: "Sl.",
      selector: (data, index) => index + 1,
      center: true,
      width: "60px",
    },
    {
      name: "Name",
      selector: (data) => data?.name,
      sortable: true,
      center: true,
		filterable: true,
    },
    {
      name: "Year",
      selector: (data) => data?.mobile_no,
      sortable: true,
      center: true,
    },

    {
      name: "Action",
      button: true,
      width: "200px",
      grow: 2,
      cell: (data) => (
        <div className="d-flex justify-content-between align-content-center">
          <a
            target="_blank"
            className="action-icon"
            style={{color:'#56CCAD',border:'2px solid #56CCAD',padding:'3px',borderRadius:'5px'}}
            // href={`UpdateGroupName/${data?.GroupId}`}
          >
            <FontAwesomeIcon  data-toggle="modal" data-target="#exampleModalLong" icon={faEye} ></FontAwesomeIcon>
          </a> 
        
       
          <a
            target="_blank"
            className="action-icon"
            style={{color:'#56CCAD',border:'2px solid #56CCAD',padding:'3px', borderRadius:'5px',marginLeft: "10px" }}
            // href={`UpdateGroupName/${data?.GroupId}`}
          >
            <FontAwesomeIcon icon={faPenToSquare} ></FontAwesomeIcon>
          </a>
          <a
            target="_blank"
            className="action-icon "
            style={{color:'red',border:'2px solid red',padding:'3px', borderRadius:'5px', marginLeft: "10px" }}
            // href={`UpdateGroupName/${data?.GroupId}`}
          >
           <FontAwesomeIcon icon={faTrash} ></FontAwesomeIcon>
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
        letterSpacing:'0.8px'
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
  const filteredItems = data?.filter(
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
              <div className="table-head-icon">
                <FontAwesomeIcon icon={faRefresh}></FontAwesomeIcon> &nbsp;
                <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon>
              </div>
            </div> &nbsp;
    <FilterComponent
      onFilter={(e) => setFilterText(e.target.value)}
      onClear={handleClear}
      filterText={filterText}
    />
     <div style={{ display: 'flex', alignItems: 'center' }}>

{/* <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/> */}
  

</div>
    </>
  );
}, [filterText, resetPaginationToggle]);

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
                <a
                  class="active nav-link text-uppercase"
                >
                  Product List
                </a>
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
      <button class="btn text-light bg-dark my-2 my-sm-0" onClick={()=>{navigate('/user-creation')}}>Create User</button>
    </form>
          </div>
        </div>
      </nav>
      <div class="container mt-4">
        <div class="row">
          <div class="col-sm-3">
            <div
              class="cardbox shadow-lg"
              style={{ borderLeft: "12px solid #000", borderRadius: "10px" }}
            >
              <div class="card-body"  data-toggle="modal" data-target="#exampleModal">
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
                  1
                </h5>
              </div>
            </div>
          </div>
          <div class="col-sm-3">
            <div
              class="cardbox shadow-lg"
              style={{ borderLeft: "12px solid #1EDFBD", borderRadius: "10px" }}
            >
              <div class="card-body">
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
                  1
                </h5>
              </div>
            </div>
          </div>
          <div class="col-sm-3">
            <div
              class="cardbox shadow-lg"
              style={{ borderLeft: "12px solid #F0C873", borderRadius: "10px" }}
            >
              <div class="card-body">
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
                  1
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
  
<UserListModal></UserListModal>
<UserActivationModal></UserActivationModal>

    </div>
  );
};

export default UserListInfo;
