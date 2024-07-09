/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useMemo, useState } from "react";
import {
  useDeleteGRNInformationMutation,
  useGetAllGRNInformationQuery,
} from "../../../../redux/features/goodsreceivenoteinfo/grninfoApi";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from "sweetalert";
import {
  faDownload,
  faPenToSquare,
  faRefresh,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { useGetAllSupplierInformationQuery } from "../../../../redux/features/supplierInformation/supplierInfoApi";
import FilterComponent from "../../../Common/ListDataSearchBoxDesign/FilterComponent";
import { downloadPDF } from "../../../ReportProperties/HeaderFooter";
import { useGetCompanyInfoQuery } from "../../../../redux/features/companyinfo/compayApi";
import styles from "./GRNInfoList.css";

const GRNInfoList = ({ permission }) => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const { data: grnAllInformation, refetch } =
    useGetAllGRNInformationQuery(undefined);
  const { data: supplierInfo } = useGetAllSupplierInformationQuery(undefined);
  const { data: companyinfo } = useGetCompanyInfoQuery(undefined);
  const [deleteGRNInfo] = useDeleteGRNInformationMutation();
  const [selectSupplierPoNo, setSelectSupplierPoNo] = useState('');
  const [isTableDispaly, setIsTableDisplay] = useState(false);
  const [fromDate, setFromDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );
  const [toDate, setToDate] = useState(new Date().toLocaleDateString("en-CA"));
  const [pOOptionsData, setPOOptionsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isFetchAfterDeleteData,setIsFetchAfterDeleteData]=useState(false)
  const reportTitle = "Goods Receive Note";
 console.log(grnAllInformation)
  useEffect(() => {
    if(isFetchAfterDeleteData){
      handleFilter()
    }
    
    const createPODropdown = (options) => {
      let result = [];
      options?.forEach((option) => {
        result.push({
          value: option.supplierPoNo,
          label: option.supplierPoNo,
        });
      });
      return result;
    };
    const poOptions = createPODropdown(grnAllInformation);
    setPOOptionsData(poOptions);
    setIsFetchAfterDeleteData(false)
  }, [grnAllInformation]);

  const columns = [
    {
      name: "Sl.",
      selector: (filteredData, index) => index + 1,
      center: true,
      width: "50px",
    },
    {
      name: "Receive Date",
      selector: (filteredData) => filteredData?.receiveDate,
      sortable: true,
      center: true,
      filterable: true,
    },
    {
      name: "GRN No",
      selector: (filteredData) => filteredData?.grnSerialNo,
      sortable: true,
      center: true,
      filterable: true,
    },
    {
      name: "Challan No",
      selector: (filteredData) => filteredData?.challanNo,
      sortable: true,
      center: true,
      filterable: true,
    },
    {
      name: "Supplier Name",
      selector: (filteredData) => {
        const supplier = supplierInfo?.find(
          (x) => x._id === filteredData?.supplierId
        );
        return supplier ? supplier.supplierName : "N/A";
      },
      sortable: true,
      center: true,
      filterable: true,
      width: "180px",
    },

    {
      name: "Supplier PO Number",
      selector: (filteredData) => filteredData?.supplierPoNo,
      sortable: true,
      center: true,
      filterable: true,
      width: "240px",
    },
    {
      name: "Total Received Quantity",
      selector: (filteredData) => filteredData?.grandTotalReceivedQuantity,
      sortable: true,
      center: true,
      filterable: true,
      width:'210px'
    },

    {
      name: "Action",
      button: true,
      width: "120px",
      grow: 2,
      cell: (filteredData) => (
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
                  filteredData?.items?.length === 0 ? "gray" : "#2DDC1B"
                } `,
                border: `${
                  filteredData?.items?.length === 0
                    ? "2px solid gray"
                    : "2px solid #2DDC1B"
                }`,
                padding: "3px",
                borderRadius: "5px",
                marginLeft: "10px",
              }}
              onClick={() => {
                //already posted in accounting system
                if (filteredData.isAccountPostingStatus === true) {
                  swal(
                    "Can not Update!",
                    "Because already posted in accounting system",
                    "error"
                  );
                } else {
                  window.open(`update-grn-info/${filteredData?._id}`);
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
              onClick={() => {
                swal({
                  title: "Are you sure to delete this item?",
                  text: "If once deleted, this item will not recovery.",
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                }).then(async (willDelete) => {
                  if (willDelete) {
                    const response = await deleteGRNInfo(
                      filteredData?._id
                    ).unwrap();
                    console.log(response);
                    if (response.status === 200) {
                      swal("Deleted!", "Your selected item has been deleted!", {
                        icon: "success",
                      });
                      refetch();
                      setIsFetchAfterDeleteData(true)
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

  const filteredItems = filteredData?.filter(
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
      <div className="d-block d-sm-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-end align-items-center">
          <div className="table-head-icon d-flex">
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
  }, [filterText, resetPaginationToggle, companyinfo, reportTitle]);

  const handleFilter = async () => {
    let filtered = grnAllInformation
    if (fromDate && toDate && selectSupplierPoNo !=='') {
      // Filter by date range and supplier PO number
      filtered = grnAllInformation.filter(item => {
        const itemDate = new Date(item.receiveDate);
        const isDateInRange =
          itemDate >= new Date(fromDate) && itemDate <= new Date(toDate);
        const isPonumberMatch = item.supplierPoNo === selectSupplierPoNo;
        return isDateInRange && isPonumberMatch;
      });
      setFilteredData(filtered);
    } else if (fromDate && toDate) {
      // Filter only by date range
      filtered = grnAllInformation?.filter(item => {
        const itemDate = new Date(item.receiveDate);
        return (
          itemDate >= new Date(fromDate) && itemDate <= new Date(toDate)
        );
      });
      setFilteredData(filtered);
    } else if (selectSupplierPoNo) {
      // Filter only by supplier PO number
      filtered = grnAllInformation.filter(item => item.supplierPoNo === selectSupplierPoNo);
    }

    // setFilteredData(filtered);
    if(filtered?.length !==0)
    {
      setIsTableDisplay(true)
    }
    else{
      setIsTableDisplay(false)
      swal({
        title: "Sorry!",
        text: "No Data Available.",
        icon: "warning",
        button: "OK",
      });
    }

  };

  return (
    <div className="row px-5 mx-4 ">
      <div
        className="col userlist-table mt-4"
        style={{
          overflow: "scroll",
          height: "480px",
        }}
      >
        <div>
        <h3 className="fw-bold mt-2">Goods Receive Note (GRN) List </h3>
        <hr />
        <div className="d-flex justify-content-between align-items-center w-75">
          <div className="w-25">
            <label htmlFor="">From Date</label>
            <br />
            <DatePicker
              dateFormat="y-MM-dd"
              className="text-center custom-datepicker2 "
              calendarClassName="custom-calendar2"
              selected={fromDate}
              required
              onChange={(fromDate) => {
                console.log(fromDate);
                if (fromDate > new Date()) {
                  swal({
                    title: "Select Valid Date",
                    text: "Date should be equal or earlier than today",
                    icon: "warning",
                    button: "OK",
                  });
                } else {
                  setFromDate(fromDate.toLocaleDateString("en-CA"));
                }
              }}
            />
          </div>
          <div className="w-25">
            <label htmlFor="">To Date</label>
            <br />
            <DatePicker
              dateFormat="y-MM-dd"
              className="text-center custom-datepicker2 "
              calendarClassName="custom-calendar2"
              selected={toDate}
              required
              onChange={(toDate) => {
                console.log(toDate);
                if (toDate > new Date()) {
                  swal({
                    title: "Select Valid Date",
                    text: "Date should be equal or earlier than today",
                    icon: "warning",
                    button: "OK",
                  });
                } else {
                  setToDate(toDate.toLocaleDateString("en-CA"));
                }
              }}
            />
          </div>
          <div style={{ width: "35%" }}>
            <div className="w-100">
              <label htmlFor="">Supplier PONo</label>
              <br />
              <div className="w-100">
                <Select
                  class="form-select"
                  className="w-100"
                  aria-label="Default select example"
                  name="poinfo"
                  options={pOOptionsData}
                  defaultValue={{
                    label: "Select Supplier PONo",
                    value: 0,
                  }}
                  value={pOOptionsData.filter(function (
                    option
                  ) {
                    return (
                      option.value === selectSupplierPoNo
                    );
                  })}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      width: "100%",
                      borderColor: state.isFocused ? "#fff" : "#fff",
                      border: "1px solid #2DDC1B",
                    }),
                    menu: (provided) => ({
                      ...provided,
                      zIndex: 9999,
                      height: "auto",
                      // overflowY: "scroll",
                    }),
                  }}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary25: "#B8FEB3",
                      primary: "#2DDC1B",
                    },
                  })}
                  onChange={(e) => {
                    setSelectSupplierPoNo(e.value);
                  }}
                ></Select>
              </div>
            </div>
          </div>
          <div>
            <button
              className="border-0 "
              style={{
                backgroundColor: "#2DDC1B",
                color: "white",
                padding: "5px 10px",
                fontSize: "14px",
                borderRadius: "5px",
                width: "100px",
                height: "38px",
                marginLeft: "10px",
                marginTop: "25px",
              }}
              onClick={handleFilter}
            >
              Show
            </button>
          </div>
          <div>
            <button
              className="border-0 "
              style={{
                backgroundColor: "red",
                color: "white",
                padding: "5px 10px",
                fontSize: "14px",
                borderRadius: "5px",
                width: "100px",
                height: "38px",
                marginLeft: "10px",
                marginTop: "25px",
              }}
              onClick={() => {
                setFromDate(new Date().toLocaleDateString('en-CA'));
                setToDate(new Date().toLocaleDateString('en-CA'));
                setSelectSupplierPoNo("");
                setIsTableDisplay(false);
              }}
            >
              Clear
            </button>
          </div>
        </div>
        </div>
       
        {isTableDispaly ? (
          <div className=" ">
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
        ) : null}
      </div>
    </div>
  );
};

export default GRNInfoList;
