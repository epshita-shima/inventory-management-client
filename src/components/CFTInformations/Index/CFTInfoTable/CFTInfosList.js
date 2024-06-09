/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useMemo, useState } from 'react'
import { useGetCompanyInfoQuery } from '../../../../redux/features/companyinfo/compayApi';
import handleCheckboxClick from '../../../Common/ListHeadingModal/Function/handleCheckboxClick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPenToSquare, faRefresh, faTrash } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import DataTable from "react-data-table-component";
import { downloadPDF } from '../../../ReportProperties/HeaderFooter';
import handleDownload from '../../../ReportProperties/HandelExcelDownload';
import FilterComponent from '../../../Common/ListDataSearchBoxDesign/FilterComponent'
import ListHeading from '../../../Common/ListHeading/ListHeading';
import ActiveListDataModal from '../../../Common/ListHeadingModal/ActiveListModal/ActiveListDataModal';
import { useDeleteCFTInfoMutation } from '../../../../redux/features/cftinformation/cftInfosApi';
const CFTInfosList = ({permission,cftInfosData,refetch}) => {

    const { data: companyinfo } = useGetCompanyInfoQuery(undefined);

    const [filterText, setFilterText] = useState("");
    const [extractedDataForReport, setExtractedDataForReport] = useState([]);
    const [extractedInActiveDataForReport, setExtractedInActiveDataForReport] =
      useState([]);
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [activeCFTInfosModal, setActiveCFTInfosModal] =
      useState(false);
    const [inActiveCFTInfosModal, setInActiveCFTInfosModal] =
      useState(false);
    const [selectedData, setSelectedData] = useState([]);
    const [deleteCFTInfoData] =useDeleteCFTInfoMutation()
    const [cftInfoActiveStatus, setCFTInfoActiveStaus] = useState([]);
    const [cftInfoInActiveStatus, setCFTInfoInActiveStatus] = useState([]);
    var reportTitle = "All Active CFT Info List";
  
console.log(cftInfosData)
  
    useEffect(() => {
      const cftInfoActiveStatus = cftInfosData?.filter(
        (item) => item.isActive == true
      );
      const cftInfoInActiveStatus = cftInfosData?.filter(
        (item) => item.isActive == false
      );
      console.log(cftInfoActiveStatus);
      console.log(cftInfoInActiveStatus);
      const extractedFields = cftInfoActiveStatus?.map((item) => {
        return {
          openingDate: item.openingDate,
          kgPerUnit: item.kgPerUnit,
        };
      });
  
      const extractedInactiveFields = cftInfoInActiveStatus?.map((item) => {
        return {
            openingDate: item.openingDate,
            kgPerUnit: item.kgPerUnit,
        };
      });
      setCFTInfoActiveStaus(cftInfoActiveStatus);
      setCFTInfoInActiveStatus(cftInfoInActiveStatus);
      setExtractedDataForReport(extractedFields);
      setExtractedInActiveDataForReport(extractedInactiveFields);
    }, [ cftInfosData?.unitId, cftInfosData]);
  
    const generateColumns = (data, fields) => {
      if (data?.length === 0) return [];
  
      return fields.map((field) => {
    if (field === "isActive") {
          return {
            name: "Status",
            button: true,
            width: "200px",
            grow: 2,
            cell: (row) => (
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
                    aria-label={`Checkbox for data item ${row.id}`}
                    checked={row.status} // Assuming status is a boolean field
                    onChange={(e) => handleCheckboxClick(row, setSelectedData)} // Assuming handleCheckboxClick is defined elsewhere
                  />
                </a>
              </div>
            ),
          };
        } else {
          return {
            name: field.charAt(0).toUpperCase() + field.slice(1), // Capitalize the first letter
            selector: (row) => row[field],
            sortable: true, // Optional: make columns sortable
            center: true,
          };
        }
      });
    };
  
    const columns = [
      {
        name: "Sl.",
        selector: (cftInfosData, index) => index + 1,
        center: true,
        width: "60px",
      },
      {
        name: "Opening Date",
        selector: (cftInfosData) => cftInfosData?.openingDate,
        sortable: true,
        center: true,
        filterable: true,
      },
      {
        name: "Kg per(unit)",
        selector: (cftInfosData) => cftInfosData?.kgPerUnit,
        sortable: true,
        center: true,
        filterable: true,
      },
  
      {
        name: "Status",
        button: true,
        width: "200px",
        grow: 2,
        cell: (cftInfosData) => (
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
            //   href={`update-cft-info/${cftInfosData._id}`}
            >
              {cftInfosData?.isActive == true ? <p>Active</p> : <p>InActive</p>}
            </a>
          </div>
        ),
      },
      {
        name: "Action",
        button: true,
        width: "200px",
        grow: 2,
        cell: (cftInfosData) => (
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
                    cftInfosData?.items?.length == 0 ? "gray" : "#2DDC1B"
                  } `,
                  border: `${
                    cftInfosData?.items?.length == 0
                      ? "2px solid gray"
                      : "2px solid #2DDC1B"
                  }`,
                  padding: "3px",
                  borderRadius: "5px",
                  marginLeft: "10px",
                }}
                onClick={() => {
                  window.open(`update-cft-info/${cftInfosData?._id}`);
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
                onClick={() => {
                  swal({
                    title: "Are you sure to delete this item?",
                    text: "If once deleted, this item will not recovery.",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  }).then(async (willDelete) => {
                    if (willDelete) {
                      const response = await deleteCFTInfoData(
                        cftInfosData?._id
                      ).unwrap();
                      console.log(response);
                      if (response.status === 200) {
                        swal("Deleted!", "Your selected item has been deleted!", {
                          icon: "success",
                        });
                      } else {
                        swal(
                          "Error",
                          "An error occurred while creating the data",
                          "error"
                        );
                      }
                    } else {
                      swal(" Cancel! Your selected item is safe!");
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
  
    const filteredItems = cftInfosData?.filter(
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
                        handleDownload(
                          extractedDataForReport,
                          companyinfo,
                          reportTitle
                        );
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
      extractedDataForReport,
      reportTitle,
      refetch,
    ]);
  
    return (
      <div className="row px-5 mx-4">
        <ListHeading
          cftInfosData={cftInfosData}
          cftInfoActiveStatus={cftInfoActiveStatus}
          cftInfoInActiveStatus={cftInfoInActiveStatus}
          setActiveDataModal={setActiveCFTInfosModal}
          setInActiveDataModal={setInActiveCFTInfosModal}
        ></ListHeading>
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
        <table id="my-table" className="d-none">
          <thead>
            <tr>
              <th>Sl.</th>
              <th>Opening Date</th>
              <th>Item Name</th>
              <th>Size Info</th>
              <th>Unit Info</th>
              <th>Opening Stock</th>
            </tr>
          </thead>
          <tbody>
            {extractedDataForReport?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.openingDate}</td>
                <td>{item.itemName}</td>
                <td>{item.sizeId}</td>
                <td>{item.unitId}</td>
                <td>{item.openingStock}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {activeCFTInfosModal ? (
          <ActiveListDataModal
            listData={cftInfoActiveStatus}
            activeDataModal={activeCFTInfosModal}
            setActiveDataModal={setActiveCFTInfosModal}
            extractedData={extractedDataForReport}
            companyinfo={companyinfo}
            generateColumns={generateColumns}
            selectedData={selectedData}
            setSelectedData={setSelectedData}
          ></ActiveListDataModal>
        ) : (
          ""
        )}
        {inActiveCFTInfosModal ? (
          <ActiveListDataModal
            listData={cftInfoInActiveStatus}
            inActiveDataModal={inActiveCFTInfosModal}
            setInActiveDataModal={setInActiveCFTInfosModal}
            companyinfo={companyinfo}
            extractedInActiveData={extractedInActiveDataForReport}
            generateColumns={generateColumns}
            selectedData={selectedData}
            setSelectedData={setSelectedData}
          ></ActiveListDataModal>
        ) : (
          ""
        )}
      </div>
    );
}

export default CFTInfosList
