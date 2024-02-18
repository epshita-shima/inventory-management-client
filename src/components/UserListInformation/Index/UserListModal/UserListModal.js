/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo } from "react";
import "./UserListModal.css";
import FilterComponent from "../FilterComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faEye,
  faPenToSquare,
  faRefresh,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import DataTable from "react-data-table-component";
const UserListModal = () => {
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
  ];
  const customStyles = {
    table:{
      style: {
        height:'380px',
        overflow:'auto'
      },
    },
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
            {/* <FontAwesomeIcon icon={faRefresh}></FontAwesomeIcon> &nbsp; */}
            <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon>
          </div>
        </div>{" "}
        &nbsp;&nbsp;
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
  }, [filterText, resetPaginationToggle]);

  return (
    <>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"

      >
        <div class="modal-dialog modal-lg" role="document" >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                All User List
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              {/* <table class="table border shadow-lg text-center">
                <thead>
                  <tr  class="text-center">
                    <th className="text-center thead-darks"  scope="col">Sl.</th>
                    <th className="text-center thead-darks" scope="col">Name</th>
                    <th className="text-center thead-darks" scope="col">Mobile</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((data,index)=>{
                      return(
                        <tr key={index}>
                        <td className="single-data">{index+1}</td>
                        <td className="single-data">{data.name}</td>
                        <td className="single-data">{data.mobile_no}</td>
                      </tr>
                      )
                    })
                  }
                 
                
                </tbody>
              </table> */}
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
    </>
  );
};

export default UserListModal;
