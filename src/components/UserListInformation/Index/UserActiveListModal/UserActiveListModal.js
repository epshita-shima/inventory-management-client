/* eslint-disable jsx-a11y/anchor-is-valid */
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useMemo, useState } from "react";
import FilterComponent from "../FilterComponent";
import DataTable from "react-data-table-component";
import { useUpdateMultipleUserStatusMutation } from "../../../../redux/features/user/userApi";
import swal from "sweetalert";
const UserActiveListModal = ({
  user,
  activeUserModal,
  inActiveUserModal,
  setInActiveUserModal,
  setActiveUserModal,
}) => {
  const [selectedData, setSelectedData] = useState([]);
  const [updateMultipleData, { isLoading, isError }] =
    useUpdateMultipleUserStatusMutation();
  console.log(selectedData);
  const handleCheckboxClick = (dataItem) => {
    console.log(dataItem);
    setSelectedData((prevSelectedData) => {
      if (prevSelectedData?.includes(dataItem)) {
        // Deselect the data item if it's already selected
        return prevSelectedData.filter((item) => item !== dataItem);
      } else {
        // Select the data item if it's not already selected
        return [...prevSelectedData, dataItem];
      }
    });
  
  };
  const handleUpdate = async () => {
    try {
      // Update the isactive field to true for all selected data items
      if (activeUserModal) {
        const updatedData = selectedData.map((item) => ({
          ...item,
          isactive: false,
        }));
        await updateMultipleData(updatedData);
        swal("Done", "Status Change Successfully", "success");
        setSelectedData([]);
      }
      if (inActiveUserModal) {
        const updatedData = selectedData.map((item) => ({
          ...item,
          isactive: true,
        }));
        await updateMultipleData(updatedData);
        swal("Done", "Status Change Successfully", "success");
        setSelectedData([]);
      }

      // setActiveUserModal(false)
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const columns = [
    {
      name: "Sl.",
      selector: (user, index) => index + 1,
      center: true,
      width: "60px",
    },
    {
      name: "Name",
      selector: (user) => user?.firstname,
      sortable: true,
      center: true,
      filterable: true,
    },
    {
      name: "Mobile No",
      selector: (user) => user?.mobileNo,
      sortable: true,
      center: true,
    },
    {
      name: "Status",
      button: true,
      width: "200px",
      grow: 2,
      cell: (user) => (
        <div className="d-flex justify-content-between align-content-center">
          <a
            target="_blank"
            className="action-icon"
            style={{
              textDecoration: "none",
              color: "#000",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            <input
              type="checkbox"
              aria-label={`Checkbox for data item ${user._id}`}
              onClick={(e) => handleCheckboxClick(user)}
            />
          </a>
        </div>
      ),
    },
  ];
  const customStyles = {
    table: {
      style: {
        height: "380px",
        overflow: "auto",
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
  const filteredItems = user?.filter(
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
    <div
      class="modal fade"
      id="exampleModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              {activeUserModal ? "All Active User" : "All Inactive User"}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                if (activeUserModal) {
                  setActiveUserModal(false);
                }
                if (inActiveUserModal) {
                  setInActiveUserModal(false);
                }
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
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
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              onClick={() => {
                if (activeUserModal) {
                  setActiveUserModal(false);
                }
                if (inActiveUserModal) {
                  setInActiveUserModal(false);
                }
              }}
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              onClick={handleUpdate}
              disabled={selectedData.length === 0 || isLoading}
            >
              Update Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserActiveListModal;
