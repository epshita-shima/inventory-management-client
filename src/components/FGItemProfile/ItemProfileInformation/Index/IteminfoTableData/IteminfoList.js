/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useMemo, useState } from "react";

import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faPenToSquare, faRefresh, faTrash } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";
import FilterComponent from "./FilterComponent";
import { useGetAllItemSizeQuery } from "../../../../../redux/features/itemsizeinfo/itemSizeInfoApi";
import { useGetAllItemUnitQuery } from "../../../../../redux/features/itemUnitInfo/itemUnitInfoApi";
import { useDeleteItemInfoMutation } from "../../../../../redux/features/iteminformation/iteminfoApi";
import ListHeading from "../../../../Common/ListHeading/ListHeading";
import { useGetCompanyInfoQuery } from "../../../../../redux/features/companyinfo/compayApi";
import { downloadPDF } from "../../../../ReportProperties/HeaderFooter";
import handleDownload from "../../../../ReportProperties/HandelExcelDownload";

const IteminfoList = ({ permission, itemInfoData }) => {
  const { data: itemSizeInfo } = useGetAllItemSizeQuery(undefined);
  const { data: itemUnitInfo } = useGetAllItemUnitQuery(undefined);
  const { data: companyinfo } = useGetCompanyInfoQuery(undefined);
  const [filterText, setFilterText] = React.useState("");
  const [extractedDataForReport, setExtractedDataForReport] = useState([]);
  const [extractedInActiveDataForReport, setExtractedInActiveDataForReport] = useState([]);
  const [resetPaginationToggle, setResetPaginationToggle] =React.useState(false);
  const [deleteItemInfo] = useDeleteItemInfoMutation();
  const[itemActiveStatus,setItemActiveStaus]=useState([])
  const[itemInActiveStatus,setItemInActiveStatus]=useState([])
  var reportTitle = "All Active Item List";
console.log(itemInfoData)
  console.log(extractedDataForReport)
  useEffect(() => {
    const itemActiveStatus = itemInfoData?.filter((item) => item.itemStatus==true);
    const itemInActiveStatus = itemInfoData?.filter((item) => item.itemStatus == false);
    
    const extractedFields = itemActiveStatus?.map((item) => {
      const size = itemSizeInfo?.find((x) => x._id === item.sizeId);
      const unit = itemUnitInfo?.find((x) => x._id === item?.unitId);
      return{
        openingDate:item.openingDate,
        itemName: item.itemName,
        sizeId: size ? size.sizeInfo : "N/A",
        unitId: unit ? unit.unitInfo : "N/A",
        openingStock:item.openingStock
      }
    });

    const extractedInactiveFields = itemInActiveStatus?.map((item) => {
      const size = itemSizeInfo?.find((x) => x._id === item.sizeId);
      const unit = itemUnitInfo?.find((x) => x._id === itemInfoData?.unitId);
      return{
        openingDate:item.openingDate,
        itemName: item.itemName,
        sizeId: size ? size.sizeInfo : "N/A",
        unitId: unit ? unit.unitInfo : "N/A",
        openingStock:item.OpeningStock
      }
    });
    setItemActiveStaus(itemActiveStatus)
    setItemInActiveStatus(itemInActiveStatus)
    setExtractedDataForReport(extractedFields);
    setExtractedInActiveDataForReport(extractedInactiveFields);
  }, [itemUnitInfo,itemInfoData?.unitId,itemSizeInfo,itemInfoData]);


  const columns = [
    {
      name: "Sl.",
      selector: (itemInfoData, index) => index + 1,
      center: true,
      width: "60px",
    },
    {
      name: "Item Name",
      selector: (itemInfoData) => itemInfoData?.itemName,
      sortable: true,
      center: true,
      filterable: true,
    },
    {
      name: "Item Size",
      selector: (itemInfoData) => {
        const size = itemSizeInfo?.find((x) => x._id === itemInfoData?.sizeId);
        return size ? size.sizeInfo : "N/A"; // Assuming 'sizeName' is the field that contains the size name
      },
      sortable: true,
      center: true,
      filterable: true,
    },
    {
      name: "Item Unit",
      selector: (itemInfoData) => {
        const unit = itemUnitInfo?.find((x) => x._id === itemInfoData?.unitId);
        return unit ? unit.unitInfo : "N/A"; // Assuming 'sizeName' is the field that contains the size name
      },
      sortable: true,
      center: true,
      filterable: true,
    },

    {
      name: "Action",
      button: true,
      width: "200px",
      grow: 2,
      cell: (itemInfoData) => (
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
                  itemInfoData?.items?.length == 0 ? "gray" : "#2DDC1B"
                } `,
                border: `${
                  itemInfoData?.items?.length == 0
                    ? "2px solid gray"
                    : "2px solid #2DDC1B"
                }`,
                padding: "3px",
                borderRadius: "5px",
                marginLeft: "10px",
              }}
              onClick={() => {
                window.open(`update-items/${itemInfoData?._id}`);
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
                    const response = await deleteItemInfo(
                      itemInfoData?._id
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

  const filteredItems = itemInfoData?.filter(
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
                      handleDownload(extractedDataForReport, companyinfo, reportTitle);
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
  ]);

  return (
    <div className="row px-5 mx-4">
      <ListHeading 
      itemInfoData={itemInfoData}
      itemActiveStatus={itemActiveStatus}
      itemInActiveStatus={itemInActiveStatus}
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
    </div>
  );
};

export default IteminfoList;
