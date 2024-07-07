/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useState } from "react";
import { useGetAllGRNInformationQuery } from "../../../../redux/features/goodsreceivenoteinfo/grninfoApi";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from "sweetalert";
import {
  faDownload,
  faPenToSquare,
  faRefresh,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useGetAllSupplierInformationQuery } from "../../../../redux/features/supplierInformation/supplierInfoApi";
import FilterComponent from "../../../Common/ListDataSearchBoxDesign/FilterComponent";
import { downloadPDF } from "../../../ReportProperties/HeaderFooter";
import { useGetCompanyInfoQuery } from "../../../../redux/features/companyinfo/compayApi";
const GRNInfoList = ({ permission }) => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const { data: grnAllInformation, refetch } =
    useGetAllGRNInformationQuery(undefined);
  const { data: supplierInfo } = useGetAllSupplierInformationQuery(undefined);
  const { data: companyinfo } = useGetCompanyInfoQuery(undefined);
  const reportTitle = "Goods Receive Note";

  const columns = [
    {
      name: "Sl.",
      selector: (grnAllInformation, index) => index + 1,
      center: true,
      width: "60px",
    },
    {
      name: "Receive Date",
      selector: (grnAllInformation) => grnAllInformation?.receiveDate,
      sortable: true,
      center: true,
      filterable: true,
    },
    {
      name: "Supplier Name",
      selector: (grnAllInformation) => {
        const supplier = supplierInfo?.find(
          (x) => x._id === grnAllInformation?.supplierId
        );
        return supplier ? supplier.supplierName : "N/A"; 
      },
      sortable: true,
      center: true,
      filterable: true,
    },

    {
      name: "PO Number",
      selector: (grnAllInformation) => grnAllInformation?.supplierPoNo,
      sortable: true,
      center: true,
      filterable: true,
    },
    {
      name: "Total Quantity",
      selector: (grnAllInformation) => grnAllInformation?.grandTotalQuantity,
      sortable: true,
      center: true,
      filterable: true,
    },
    {
      name: "Total Amount",
      selector: (grnAllInformation) => grnAllInformation?.grandTotalAmount,
      sortable: true,
      center: true,
      filterable: true,
    },

    {
      name: "Action",
      button: true,
      width: "200px",
      grow: 2,
      cell: (grnAllInformation) => (
        <div className="d-flex justify-content-between align-content-center">
          {permission?.isUpdated ? (
            <a
              target="_blank"
              className={` action-icon `}
              data-toggle="tooltip"
              data-placement="bottom"
              title="Update item"
              style={{
                color: `${
                  grnAllInformation?.items?.length === 0 ? "gray" : "#2DDC1B"
                } `,
                border: `${
                  grnAllInformation?.items?.length === 0
                    ? "2px solid gray"
                    : "2px solid #2DDC1B"
                }`,
                padding: "3px",
                borderRadius: "5px",
                marginLeft: "10px",
              }}
              onClick={() => {
                //already posted in accounting system
                if (grnAllInformation.isAccountPostingStatus===true) {
                  swal(
                    "Can not Update!",
                    "Because already posted in accounting system",
                    "error"
                  );
                } else {
                  window.open(
                    `update-grn-info/${grnAllInformation?._id}`
                  );
                }
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
            </a>
          ) : (
            ""
          )}

          {permission?.isRemoved ? (
            <a
              target="_blank"
              className="action-icon "
              data-toggle="tooltip"
              data-placement="bottom"
              title="Delete Item"
              style={{
                color: "red",
                border: "2px solid red",
                padding: "3px",
                borderRadius: "5px",
                marginLeft: "10px",
              }}
              //   onClick={() => {
              //     swal({
              //       title: "Are you sure to delete this item?",
              //       text: "If once deleted, this item will not recovery.",
              //       icon: "warning",
              //       buttons: true,
              //       dangerMode: true,
              //     }).then(async (willDelete) => {
              //       if (willDelete) {
              //         const response = await deleteRMItemInfo(
              //           grnAllInformation?._id
              //         ).unwrap();
              //         console.log(response);
              //         if (response.status === 200) {
              //           swal("Deleted!", "Your selected item has been deleted!", {
              //             icon: "success",
              //           });
              //         } else {
              //           swal(
              //             "Error",
              //             "An error occurred while creating the data",
              //             "error"
              //           );
              //         }
              //       } else {
              //         swal(" Cancel! Your selected item is safe!");
              //       }
              //     });
              //   }}
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

  const filteredItems = grnAllInformation?.filter(
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
              <FontAwesomeIcon
                icon={faRefresh}
                onClick={() => refetch()}
              ></FontAwesomeIcon>{" "}
              &nbsp;
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
                      //   handleDownload(
                      //     extractedAllData,
                      //     companyinfo,
                      //     reportTitle
                      //   );
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
  }, [filterText, resetPaginationToggle, companyinfo, reportTitle, refetch]);

  return (
    <div className="row px-5 mx-4">
      <div
        className="col userlist-table mt-4"
        style={{
          overflow: "scroll",
          height: "420px",
        }}
      >
        <div className="shadow-lg ">
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
  );
};

export default GRNInfoList;
